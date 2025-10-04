import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
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
      const createdServicio = new this.servicioModel(createServicioDto);
      const savedServicio = await createdServicio.save();
      return await savedServicio.populate('id_subcategoria');
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new BadRequestException('Datos del servicio inválidos');
      }
      throw error;
    }
  }

  async findAll(): Promise<Servicio[]> {
    return this.servicioModel.find().populate('id_subcategoria').exec();
  }

  async findOne(id: string): Promise<Servicio> {
    this.validateMongoId(id);
    const servicio = await this.servicioModel.findById(id).populate('id_subcategoria').exec();
    if (!servicio) throw new NotFoundException(`Servicio con ID ${id} no encontrado`);
    return servicio;
  }

  async update(id: string, updateServicioDto: UpdateServicioDto): Promise<Servicio> {
    this.validateMongoId(id);
    
    const servicio = await this.servicioModel.findById(id);
    if (!servicio) throw new NotFoundException(`Servicio con ID ${id} no encontrado`);

    Object.assign(servicio, updateServicioDto);
    return await servicio.save();
  }

  async remove(id: string): Promise<Servicio> {
    this.validateMongoId(id);
    const deletedServicio = await this.servicioModel.findByIdAndDelete(id);
    if (!deletedServicio) throw new NotFoundException(`Servicio con ID ${id} no encontrado`);
    return deletedServicio;
  }

  async findBySubcategoria(idSubcategoria: string): Promise<Servicio[]> {
    this.validateMongoId(idSubcategoria);
    return this.servicioModel.find({ id_subcategoria: idSubcategoria }).populate('id_subcategoria').exec();
  }

  async cambiarEstado(id: string, estado: string): Promise<Servicio> {
    this.validateMongoId(id);
    if (!['activo', 'inactivo'].includes(estado)) {
      throw new BadRequestException('El estado debe ser "activo" o "inactivo"');
    }
    const servicio = await this.servicioModel.findByIdAndUpdate(id, { estado }, { new: true }).populate('id_subcategoria');
    if (!servicio) throw new NotFoundException(`Servicio con ID ${id} no encontrado`);
    return servicio;
  }
}