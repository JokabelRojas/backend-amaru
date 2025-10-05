import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { CreateDetalleInscripcionDto } from './dto/create-detalle-inscripcion.dto';
import { UpdateDetalleInscripcionDto } from './dto/update-detalle-inscripcion.dto';
import { DetalleInscripcion } from 'src/entities/detalle-inscripcion.entity';

@Injectable()
export class DetalleInscripcionesService {
  constructor(
    @InjectModel(DetalleInscripcion.name) 
    private detalleInscripcionModel: Model<DetalleInscripcion>,
  ) {}

  private validateMongoId(id: string): void {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`ID ${id} no es válido`);
    }
  }

  async create(createDetalleInscripcionDto: CreateDetalleInscripcionDto): Promise<DetalleInscripcion> {
    try {
      // Validar que tenga al menos un id_taller o id_bloque
      if (!createDetalleInscripcionDto.id_taller && !createDetalleInscripcionDto.id_bloque) {
        throw new BadRequestException('Debe especificar id_taller o id_bloque');
      }

      const createdDetalle = new this.detalleInscripcionModel(createDetalleInscripcionDto);
      const savedDetalle = await createdDetalle.save();
      
      return await savedDetalle.populate([
        'id_inscripcion',
        'id_taller', 
        'id_bloque'
      ]);
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new BadRequestException('Datos del detalle inválidos');
      }
      throw error;
    }
  }

  async findAll(): Promise<DetalleInscripcion[]> {
    return this.detalleInscripcionModel
      .find()
      .populate('id_inscripcion')
      .populate('id_taller')
      .populate('id_bloque')
      .exec();
  }

  async findOne(id: string): Promise<DetalleInscripcion> {
    this.validateMongoId(id);
    const detalle = await this.detalleInscripcionModel
      .findById(id)
      .populate('id_inscripcion')
      .populate('id_taller')
      .populate('id_bloque')
      .exec();
    if (!detalle) throw new NotFoundException(`Detalle con ID ${id} no encontrado`);
    return detalle;
  }

  async update(id: string, updateDetalleInscripcionDto: UpdateDetalleInscripcionDto): Promise<DetalleInscripcion> {
    this.validateMongoId(id);
    
    const detalle = await this.detalleInscripcionModel.findById(id);
    if (!detalle) throw new NotFoundException(`Detalle con ID ${id} no encontrado`);

    Object.assign(detalle, updateDetalleInscripcionDto);
    await detalle.save();
    
    const updatedDetalle = await this.detalleInscripcionModel
      .findById(id)
      .populate('id_inscripcion')
      .populate('id_taller')
      .populate('id_bloque')
      .exec();
    if (!updatedDetalle) throw new NotFoundException(`Detalle con ID ${id} no encontrado`);
    return updatedDetalle;
  }

  async remove(id: string): Promise<DetalleInscripcion> {
    this.validateMongoId(id);
    const deletedDetalle = await this.detalleInscripcionModel.findByIdAndDelete(id);
    if (!deletedDetalle) throw new NotFoundException(`Detalle con ID ${id} no encontrado`);
    return deletedDetalle;
  }

  async findByInscripcion(idInscripcion: string): Promise<DetalleInscripcion[]> {
    this.validateMongoId(idInscripcion);
    return this.detalleInscripcionModel
      .find({ id_inscripcion: idInscripcion })
      .populate('id_inscripcion')
      .populate('id_taller')
      .populate('id_bloque')
      .exec();
  }

  async findByTaller(idTaller: string): Promise<DetalleInscripcion[]> {
    this.validateMongoId(idTaller);
    return this.detalleInscripcionModel
      .find({ id_taller: idTaller })
      .populate('id_inscripcion')
      .populate('id_taller')
      .populate('id_bloque')
      .exec();
  }

  async findByBloque(idBloque: string): Promise<DetalleInscripcion[]> {
    this.validateMongoId(idBloque);
    return this.detalleInscripcionModel
      .find({ id_bloque: idBloque })
      .populate('id_inscripcion')
      .populate('id_taller')
      .populate('id_bloque')
      .exec();
  }

  async cambiarEstado(id: string, estado: string): Promise<DetalleInscripcion> {
    this.validateMongoId(id);
    const estadosPermitidos = ['pendiente', 'confirmado', 'cancelado'];
    if (!estadosPermitidos.includes(estado)) {
      throw new BadRequestException(`Estado debe ser: ${estadosPermitidos.join(', ')}`);
    }
    const detalle = await this.detalleInscripcionModel
      .findByIdAndUpdate(id, { estado }, { new: true })
      .populate('id_inscripcion')
      .populate('id_taller')
      .populate('id_bloque')
      .exec();
    if (!detalle) throw new NotFoundException(`Detalle con ID ${id} no encontrado`);
    return detalle;
  }

  async getEstadisticasByTaller(idTaller: string): Promise<any> {
    this.validateMongoId(idTaller);
    return this.detalleInscripcionModel.aggregate([
      { $match: { id_taller: idTaller } },
      { 
        $group: {
          _id: '$estado',
          total: { $sum: '$precio_total' },
          cantidad: { $sum: '$cantidad' }
        }
      }
    ]);
  }
}