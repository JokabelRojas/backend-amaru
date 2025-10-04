import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { CreateTallerDto } from './dto/create-talleres.dto';
import { UpdateTallerDto } from './dto/update-talleres.dto';
import { Taller } from 'src/entities/taller.entity';

@Injectable()
export class TalleresService {
  constructor(
    @InjectModel(Taller.name) 
    private tallerModel: Model<Taller>,
  ) {}

  private validateMongoId(id: string): void {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`ID ${id} no es un ID de MongoDB válido`);
    }
  }

async create(createTallerDto: CreateTallerDto): Promise<Taller> {
  try {
    // Validar que la subcategoría existe
    this.validateMongoId(createTallerDto.id_subcategoria);
    
    // Validar fechas
    if (new Date(createTallerDto.fecha_fin) <= new Date(createTallerDto.fecha_inicio)) {
      throw new BadRequestException('La fecha de fin debe ser posterior a la fecha de inicio');
    }

    // Calcular cupo_disponible igual al cupo_total al crear
    const tallerData = {
      ...createTallerDto,
      cupo_disponible: createTallerDto.cupo_total
    };

    const createdTaller = new this.tallerModel(tallerData);
    const savedTaller = await createdTaller.save();
    
    // Hacer populate explícito para asegurar que funcione
    const taller = await this.tallerModel
      .findById(savedTaller._id)
      .populate('id_subcategoria')
      .exec();
    if (!taller) {
      throw new NotFoundException(`Taller con ID ${savedTaller._id} no encontrado`);
    }
    return taller;
      
  } catch (error) {
    if (error.name === 'ValidationError') {
      throw new BadRequestException('Datos del taller inválidos');
    }
    if (error.name === 'CastError') {
      throw new BadRequestException('ID de subcategoría inválido');
    }
    throw error;
  }
}

  async findAll(): Promise<Taller[]> {
    return this.tallerModel
      .find()
      .populate('id_subcategoria')
      .exec();
  }

  async findOne(id: string): Promise<Taller> {
    this.validateMongoId(id);
    
    const taller = await this.tallerModel
      .findById(id)
      .populate('id_subcategoria')
      .exec();
    
    if (!taller) {
      throw new NotFoundException(`Taller con ID ${id} no encontrado`);
    }
    
    return taller;
  }

async update(id: string, updateTallerDto: UpdateTallerDto): Promise<Taller> {
  this.validateMongoId(id);

  // Crear un objeto para las actualizaciones
  const updateData: any = { ...updateTallerDto };

  // Validaciones adicionales para update
  if (updateTallerDto.fecha_inicio && updateTallerDto.fecha_fin) {
    if (new Date(updateTallerDto.fecha_fin) <= new Date(updateTallerDto.fecha_inicio)) {
      throw new BadRequestException('La fecha de fin debe ser posterior a la fecha de inicio');
    }
  }

  // Si se actualiza cupo_total, recalcular cupo_disponible
  if (updateTallerDto.cupo_total) {
    const tallerExistente = await this.tallerModel.findById(id);
    if (tallerExistente) {
      const diferencia = updateTallerDto.cupo_total - tallerExistente.cupo_total;
      updateData.cupo_disponible = Math.max(0, tallerExistente.cupo_disponible + diferencia);
    }
  }

  const existingTaller = await this.tallerModel
    .findByIdAndUpdate(id, updateData, { new: true })
    .populate('id_subcategoria')
    .exec();
  
  if (!existingTaller) {
    throw new NotFoundException(`Taller con ID ${id} no encontrado`);
  }
  
  return existingTaller;
}

  async remove(id: string): Promise<Taller> {
    this.validateMongoId(id);
    
    const deletedTaller = await this.tallerModel
      .findByIdAndDelete(id)
      .populate('id_subcategoria');
    
    if (!deletedTaller) {
      throw new NotFoundException(`Taller con ID ${id} no encontrado`);
    }
    
    return deletedTaller;
  }

  async findBySubcategoria(idSubcategoria: string): Promise<Taller[]> {
    this.validateMongoId(idSubcategoria);
    
    return this.tallerModel
      .find({ id_subcategoria: idSubcategoria })
      .populate('id_subcategoria')
      .exec();
  }

  async cambiarEstado(id: string, estado: string): Promise<Taller> {
    this.validateMongoId(id);
    
    if (!['activo', 'inactivo'].includes(estado)) {
      throw new BadRequestException('El estado debe ser "activo" o "inactivo"');
    }
    
    const taller = await this.tallerModel
      .findByIdAndUpdate(id, { estado }, { new: true })
      .populate('id_subcategoria')
      .exec();
    
    if (!taller) {
      throw new NotFoundException(`Taller con ID ${id} no encontrado`);
    }
    
    return taller;
  }

  async actualizarCupo(id: string, cuposReservados: number): Promise<Taller> {
    this.validateMongoId(id);
    
    const taller = await this.tallerModel.findById(id);
    if (!taller) {
      throw new NotFoundException(`Taller con ID ${id} no encontrado`);
    }

    const nuevoCupoDisponible = taller.cupo_disponible - cuposReservados;
    if (nuevoCupoDisponible < 0) {
      throw new BadRequestException('No hay cupos disponibles suficientes');
    }

    taller.cupo_disponible = nuevoCupoDisponible;
    return await taller.save();
  }

  async findActivos(): Promise<Taller[]> {
    return this.tallerModel
      .find({ 
        estado: 'activo',
        fecha_inicio: { $gte: new Date() } // Talleres con fecha futura
      })
      .populate('id_subcategoria')
      .exec();
  }

  async findProximos(): Promise<Taller[]> {
    const ahora = new Date();
    const unaSemanaDespues = new Date(ahora.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return this.tallerModel
      .find({
        estado: 'activo',
        fecha_inicio: { 
          $gte: ahora,
          $lte: unaSemanaDespues
        },
        cupo_disponible: { $gt: 0 }
      })
      .populate('id_subcategoria')
      .exec();
  }
}