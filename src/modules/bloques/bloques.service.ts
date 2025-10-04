import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { CreateBloqueDto } from './dto/create-bloques.dto';
import { UpdateBloqueDto } from './dto/update-bloques.dto';
import { Bloque } from 'src/entities/bloque.entity';

@Injectable()
export class BloquesService {
  constructor(
    @InjectModel(Bloque.name) private bloqueModel: Model<Bloque>,
  ) {}

  private validateMongoId(id: string): void {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`ID ${id} no es válido`);
    }
  }

  async create(createBloqueDto: CreateBloqueDto): Promise<Bloque> {
    try {
      if (new Date(createBloqueDto.fecha_fin) <= new Date(createBloqueDto.fecha_inicio)) {
        throw new BadRequestException('La fecha de fin debe ser posterior a la fecha de inicio');
      }

      const bloqueData = {
        ...createBloqueDto,
        cupo_disponible: createBloqueDto.cupo_total
      };

      const createdBloque = new this.bloqueModel(bloqueData);
      const savedBloque = await createdBloque.save();
      
      return await savedBloque.populate('id_taller');
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new BadRequestException('Datos del bloque inválidos');
      }
      throw error;
    }
  }

  async findAll(): Promise<Bloque[]> {
    return this.bloqueModel.find().populate('id_taller').exec();
  }

  async findOne(id: string): Promise<Bloque> {
    this.validateMongoId(id);
    const bloque = await this.bloqueModel.findById(id).populate('id_taller').exec();
    if (!bloque) throw new NotFoundException(`Bloque con ID ${id} no encontrado`);
    return bloque;
  }

  async update(id: string, updateBloqueDto: UpdateBloqueDto): Promise<Bloque> {
    this.validateMongoId(id);
    
    const bloque = await this.bloqueModel.findById(id);
    if (!bloque) throw new NotFoundException(`Bloque con ID ${id} no encontrado`);

    Object.assign(bloque, updateBloqueDto);

    if (bloque.fecha_fin <= bloque.fecha_inicio) {
      throw new BadRequestException('La fecha de fin debe ser posterior a la fecha de inicio');
    }

    if (updateBloqueDto.cupo_total !== undefined && updateBloqueDto.cupo_total !== bloque.cupo_total) {
      const diferencia = updateBloqueDto.cupo_total - bloque.cupo_total;
      bloque.cupo_disponible = Math.max(0, bloque.cupo_disponible + diferencia);
    }

    return await bloque.save();
  }

  async remove(id: string): Promise<Bloque> {
    this.validateMongoId(id);
    const deletedBloque = await this.bloqueModel.findByIdAndDelete(id);
    if (!deletedBloque) throw new NotFoundException(`Bloque con ID ${id} no encontrado`);
    return deletedBloque;
  }

  async findByTaller(idTaller: string): Promise<Bloque[]> {
    this.validateMongoId(idTaller);
    return this.bloqueModel.find({ id_taller: idTaller }).populate('id_taller').exec();
  }

  async cambiarEstado(id: string, estado: string): Promise<Bloque> {
    this.validateMongoId(id);
    if (!['activo', 'inactivo'].includes(estado)) {
      throw new BadRequestException('El estado debe ser "activo" o "inactivo"');
    }
    const bloque = await this.bloqueModel.findByIdAndUpdate(id, { estado }, { new: true }).populate('id_taller');
    if (!bloque) throw new NotFoundException(`Bloque con ID ${id} no encontrado`);
    return bloque;
  }

  async actualizarCupo(id: string, cuposReservados: number): Promise<Bloque> {
    this.validateMongoId(id);
    const bloque = await this.bloqueModel.findById(id);
    if (!bloque) throw new NotFoundException(`Bloque con ID ${id} no encontrado`);

    const nuevoCupoDisponible = bloque.cupo_disponible - cuposReservados;
    if (nuevoCupoDisponible < 0) throw new BadRequestException('No hay cupos disponibles suficientes');

    bloque.cupo_disponible = nuevoCupoDisponible;
    return await bloque.save();
  }
}