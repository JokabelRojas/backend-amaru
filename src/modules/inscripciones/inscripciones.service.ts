import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { CreateInscripcionDto } from './dto/create-inscripciones.dto';
import { UpdateInscripcionDto } from './dto/update-inscripciones.dto';
import { Inscripcion } from 'src/entities/inscripcion.entity';

@Injectable()
export class InscripcionesService {
  constructor(
    @InjectModel(Inscripcion.name) private inscripcionModel: Model<Inscripcion>,
  ) {}

  private validateMongoId(id: string): void {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`ID ${id} no es válido`);
    }
  }

  async create(createInscripcionDto: CreateInscripcionDto): Promise<Inscripcion> {
    try {
      const createdInscripcion = new this.inscripcionModel(createInscripcionDto);
      const savedInscripcion = await createdInscripcion.save();
      return await savedInscripcion.populate('id_usuario');
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new BadRequestException('Datos de la inscripción inválidos');
      }
      throw error;
    }
  }

  async findAll(): Promise<Inscripcion[]> {
    return this.inscripcionModel.find().populate('id_usuario').exec();
  }

  async findOne(id: string): Promise<Inscripcion> {
    this.validateMongoId(id);
    const inscripcion = await this.inscripcionModel.findById(id).populate('id_usuario').exec();
    if (!inscripcion) throw new NotFoundException(`Inscripción con ID ${id} no encontrada`);
    return inscripcion;
  }

  async update(id: string, updateInscripcionDto: UpdateInscripcionDto): Promise<Inscripcion> {
    this.validateMongoId(id);
    
    const inscripcion = await this.inscripcionModel.findById(id);
    if (!inscripcion) throw new NotFoundException(`Inscripción con ID ${id} no encontrada`);

    Object.assign(inscripcion, updateInscripcionDto);
    return await inscripcion.save();
  }

  async remove(id: string): Promise<Inscripcion> {
    this.validateMongoId(id);
    const deletedInscripcion = await this.inscripcionModel.findByIdAndDelete(id);
    if (!deletedInscripcion) throw new NotFoundException(`Inscripción con ID ${id} no encontrada`);
    return deletedInscripcion;
  }

  async findByUsuario(idUsuario: string): Promise<Inscripcion[]> {
    this.validateMongoId(idUsuario);
    return this.inscripcionModel.find({ id_usuario: idUsuario }).populate('id_usuario').exec();
  }

  async cambiarEstado(id: string, estado: string): Promise<Inscripcion> {
    this.validateMongoId(id);
    const estadosPermitidos = ['pendiente','aprobado','rechazado'];
    if (!estadosPermitidos.includes(estado)) {
      throw new BadRequestException(`Estado debe ser: ${estadosPermitidos.join(', ')}`);
    }
    const inscripcion = await this.inscripcionModel.findByIdAndUpdate(
      id, 
      { estado }, 
      { new: true }
    ).populate('id_usuario');
    if (!inscripcion) throw new NotFoundException(`Inscripción con ID ${id} no encontrada`);
    return inscripcion;
  }

  async findByEstado(estado: string): Promise<Inscripcion[]> {
    const estadosPermitidos = ['pendiente','aprobado','rechazado'];
    if (!estadosPermitidos.includes(estado)) {
      throw new BadRequestException(`Estado debe ser: ${estadosPermitidos.join(', ')}`);
    }
    return this.inscripcionModel.find({ estado }).populate('id_usuario').exec();
  }

  async getEstadisticas(): Promise<any> {
    const total = await this.inscripcionModel.countDocuments();
    const porEstado = await this.inscripcionModel.aggregate([
      { $group: { _id: '$estado', count: { $sum: 1 } } }
    ]);
    const ingresos = await this.inscripcionModel.aggregate([
      { $match: { estado: 'pagado' } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);

    return {
      total,
      porEstado,
      ingresosTotales: ingresos[0]?.total || 0
    };
  }
}