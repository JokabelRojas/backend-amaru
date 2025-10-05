import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { CreatePagoDto } from './dto/create-pagos.dto';
import { UpdatePagoDto } from './dto/update-pagos.dto';
import { Pago } from 'src/entities/pago.entity';

@Injectable()
export class PagosService {
  constructor(
    @InjectModel(Pago.name) private pagoModel: Model<Pago>,
  ) {}

  private validateMongoId(id: string): void {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`ID ${id} no es válido`);
    }
  }

  async create(createPagoDto: CreatePagoDto): Promise<Pago> {
    try {
      const createdPago = new this.pagoModel(createPagoDto);
      const savedPago = await createdPago.save();
      return await savedPago.populate(['id_detalle', 'id_usuario_pago']);
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new BadRequestException('Datos del pago inválidos');
      }
      throw error;
    }
  }

  async findAll(): Promise<Pago[]> {
    return this.pagoModel.find().populate('id_detalle').populate('id_usuario_pago').exec();
  }

  async findOne(id: string): Promise<Pago> {
    this.validateMongoId(id);
    const pago = await this.pagoModel.findById(id).populate('id_detalle').populate('id_usuario_pago').exec();
    if (!pago) throw new NotFoundException(`Pago con ID ${id} no encontrado`);
    return pago;
  }

  async update(id: string, updatePagoDto: UpdatePagoDto): Promise<Pago> {
    this.validateMongoId(id);
    const pago = await this.pagoModel.findById(id);
    if (!pago) throw new NotFoundException(`Pago con ID ${id} no encontrado`);
    Object.assign(pago, updatePagoDto);
    await pago.save();
    const updatedPago = await this.pagoModel.findById(id).populate('id_detalle').populate('id_usuario_pago').exec();
    if (!updatedPago) throw new NotFoundException(`Pago con ID ${id} no encontrado`);
    return updatedPago;
  }

  async remove(id: string): Promise<Pago> {
    this.validateMongoId(id);
    const deletedPago = await this.pagoModel.findByIdAndDelete(id);
    if (!deletedPago) throw new NotFoundException(`Pago con ID ${id} no encontrado`);
    return deletedPago;
  }

  async findByUsuario(idUsuario: string): Promise<Pago[]> {
    this.validateMongoId(idUsuario);
    return this.pagoModel.find({ id_usuario_pago: idUsuario }).populate('id_detalle').populate('id_usuario_pago').exec();
  }

  async findByDetalle(idDetalle: string): Promise<Pago[]> {
    this.validateMongoId(idDetalle);
    return this.pagoModel.find({ id_detalle: idDetalle }).populate('id_detalle').populate('id_usuario_pago').exec();
  }

  async cambiarEstado(id: string, estado: string): Promise<Pago> {
    this.validateMongoId(id);
    const estadosPermitidos = ['pendiente', 'completado', 'fallido', 'reembolsado'];
    if (!estadosPermitidos.includes(estado)) {
      throw new BadRequestException(`Estado debe ser: ${estadosPermitidos.join(', ')}`);
    }
    const pago = await this.pagoModel.findByIdAndUpdate(id, { estado }, { new: true }).populate('id_detalle').populate('id_usuario_pago');
    if (!pago) throw new NotFoundException(`Pago con ID ${id} no encontrado`);
    return pago;
  }

  async getEstadisticas(): Promise<any> {
    const total = await this.pagoModel.countDocuments();
    const porEstado = await this.pagoModel.aggregate([{ $group: { _id: '$estado', count: { $sum: 1 } } }]);
    return { total, porEstado };
  }
}