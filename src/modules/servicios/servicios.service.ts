import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, isValidObjectId } from 'mongoose';
import { CreateServicioDto } from './dto/create-servicios.dto';
import { UpdateServicioDto } from './dto/update-servicios.dto';
import { Servicio } from 'src/entities/servicio.entity';

@Injectable()
export class ServiciosService {
  constructor(
    @InjectModel(Servicio.name) private servicioModel: Model<Servicio>,
  ) {}

  private validateMongoId(id: string): void {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`ID ${id} no es válido`);
    }
  }

  async create(createServicioDto: CreateServicioDto): Promise<Servicio> {
    try {
      // Validar que ambos IDs existen
      this.validateMongoId(createServicioDto.id_categoria);
      this.validateMongoId(createServicioDto.id_subcategoria);

      const createdServicio = new this.servicioModel(createServicioDto);
      const savedServicio = await createdServicio.save();
      
      // Poblar ambas referencias
      return await savedServicio.populate([
        'id_categoria',
        'id_subcategoria'
      ]);
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new BadRequestException('Datos del servicio inválidos');
      }
      throw error;
    }
  }

  async findAll(): Promise<Servicio[]> {
    return this.servicioModel.find()
      .populate('id_categoria')
      .populate('id_subcategoria')
      .exec();
  }

  async findOne(id: string): Promise<Servicio> {
    this.validateMongoId(id);
    const servicio = await this.servicioModel.findById(id)
      .populate('id_categoria')
      .populate('id_subcategoria')
      .exec();
    if (!servicio) throw new NotFoundException(`Servicio con ID ${id} no encontrado`);
    return servicio;
  }

  async update(id: string, updateServicioDto: UpdateServicioDto): Promise<Servicio> {
    this.validateMongoId(id);
    
    const servicio = await this.servicioModel.findById(id);
    if (!servicio) throw new NotFoundException(`Servicio con ID ${id} no encontrado`);

    Object.assign(servicio, updateServicioDto);
    const updatedServicio = await servicio.save();
    
    return await updatedServicio.populate([
      'id_categoria',
      'id_subcategoria'
    ]);
  }

  async remove(id: string): Promise<Servicio> {
    this.validateMongoId(id);
    const deletedServicio = await this.servicioModel.findByIdAndDelete(id);
    if (!deletedServicio) throw new NotFoundException(`Servicio con ID ${id} no encontrado`);
    return deletedServicio;
  }

  async findBySubcategoria(idSubcategoria: string): Promise<Servicio[]> {
    this.validateMongoId(idSubcategoria);
    return this.servicioModel.find({ id_subcategoria: idSubcategoria })
      .populate('id_categoria')
      .populate('id_subcategoria')
      .exec();
  }

  async findByCategoria(idCategoria: string): Promise<Servicio[]> {
    this.validateMongoId(idCategoria);
    return this.servicioModel.find({ id_categoria: idCategoria })
      .populate('id_categoria')
      .populate('id_subcategoria')
      .exec();
  }

  async cambiarEstado(id: string, estado: string): Promise<Servicio> {
    this.validateMongoId(id);
    if (!['activo', 'inactivo'].includes(estado)) {
      throw new BadRequestException('El estado debe ser "activo" o "inactivo"');
    }
    const servicio = await this.servicioModel.findByIdAndUpdate(
      id, 
      { estado }, 
      { new: true }
    )
      .populate('id_categoria')
      .populate('id_subcategoria');
    
    if (!servicio) throw new NotFoundException(`Servicio con ID ${id} no encontrado`);
    return servicio;
  }

  async filtrarServicios(filtros: {
    id_categoria?: string;
    id_subcategoria?: string;
    estado?: string;
  }): Promise<Servicio[]> {
    const query: any = {};

    // 🔹 Validar y filtrar id_categoria
    if (filtros.id_categoria && isValidObjectId(filtros.id_categoria)) {
      query.id_categoria = new Types.ObjectId(filtros.id_categoria);
    }

    // 🔹 Validar y filtrar id_subcategoria
    if (filtros.id_subcategoria && isValidObjectId(filtros.id_subcategoria)) {
      query.id_subcategoria = new Types.ObjectId(filtros.id_subcategoria);
    }

    // 🔹 Filtro: estado
    if (filtros.estado && ['activo', 'inactivo'].includes(filtros.estado.toLowerCase())) {
      query.estado = filtros.estado.toLowerCase();
    }

    console.log('Query ejecutado para servicios:', JSON.stringify(query, null, 2));

    return this.servicioModel
      .find(query)
      .populate('id_categoria')
      .populate('id_subcategoria')
      .exec();
  }
}