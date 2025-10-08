import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { DetalleInscripcion } from './detalle-inscripcion.entity';
import { Usuario } from './usuario.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class Pago extends Document {
  @ApiProperty({
    description: 'ID del detalle de inscripción asociado al pago',
    example: '507f1f77bcf86cd799439011',
    required: true
  })
  @Prop({ 
    type: MongooseSchema.Types.ObjectId, 
    ref: 'DetalleInscripcion', 
    required: true 
  })
  id_detalle: DetalleInscripcion;

  @ApiProperty({
    description: 'ID del usuario que realiza el pago',
    example: '507f1f77bcf86cd799439012',
    required: true
  })
  @Prop({ 
    type: MongooseSchema.Types.ObjectId, 
    ref: 'Usuario', 
    required: true 
  })
  id_usuario_pago: Usuario;

  @ApiProperty({
    description: 'Moneda del pago',
    example: 'PEN',
    enum: ['PEN', 'USD'],
    default: 'PEN'
  })
  @Prop({ 
    default: 'PEN', 
    enum: ['PEN', 'USD'] 
  })
  moneda: string;

  @ApiProperty({
    description: 'Método de pago utilizado',
    example: 'tarjeta_credito',
    required: true
  })
  @Prop({ required: true })
  metodo_pago: string;

  @ApiPropertyOptional({
    description: 'ID único de la transacción en el procesador de pagos',
    example: 'txn_abc123xyz789'
  })
  @Prop()
  transaction_id: string;

  @ApiProperty({
    description: 'Fecha en que se realizó el pago',
    example: '2024-01-15T14:30:00.000Z',
    default: 'Fecha actual'
  })
  @Prop({ default: Date.now })
  fecha_pago: Date;

  @ApiPropertyOptional({
    description: 'URL del comprobante de pago',
    example: 'https://ejemplo.com/comprobantes/comprobante-123.pdf'
  })
  @Prop()
  comprobante_url: string;

  @ApiProperty({
    description: 'Estado del pago',
    example: 'pendiente',
    enum: ['pendiente', 'completado', 'fallido', 'reembolsado'],
    default: 'pendiente'
  })
  @Prop({ 
    default: 'pendiente', 
    enum: ['pendiente', 'completado', 'fallido', 'reembolsado'] 
  })
  estado: string;

  // Campos automáticos de timestamps
  @ApiProperty({
    description: 'Fecha de creación automática',
    example: '2024-01-15T14:30:00.000Z'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Fecha de última actualización automática',
    example: '2024-01-15T14:30:00.000Z'
  })
  updatedAt: Date;
}

export const PagoSchema = SchemaFactory.createForClass(Pago);

// Índices
PagoSchema.index({ id_detalle: 1 });
PagoSchema.index({ id_usuario_pago: 1 });
PagoSchema.index({ estado: 1 });
PagoSchema.index({ fecha_pago: 1 });