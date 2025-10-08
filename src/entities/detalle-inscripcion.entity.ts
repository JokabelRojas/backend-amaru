import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Inscripcion } from './inscripcion.entity';
import { Taller } from './taller.entity';
import { Bloque } from './bloque.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class DetalleInscripcion extends Document {
  @ApiProperty({
    description: 'ID de la inscripción a la que pertenece el detalle',
    example: '507f1f77bcf86cd799439011',
    required: true
  })
  @Prop({ 
    type: MongooseSchema.Types.ObjectId, 
    ref: 'Inscripcion', 
    required: true 
  })
  id_inscripcion: Inscripcion;

  @ApiPropertyOptional({
    description: 'ID del taller inscrito (debe especificar id_taller o id_bloque)',
    example: '507f1f77bcf86cd799439012'
  })
  @Prop({ 
    type: MongooseSchema.Types.ObjectId, 
    ref: 'Taller' 
  })
  id_taller: Taller;

  @ApiPropertyOptional({
    description: 'ID del bloque inscrito (debe especificar id_taller o id_bloque)',
    example: '507f1f77bcf86cd799439013'
  })
  @Prop({ 
    type: MongooseSchema.Types.ObjectId, 
    ref: 'Bloque' 
  })
  id_bloque: Bloque;

  @ApiProperty({
    description: 'Cantidad de inscripciones',
    example: 1,
    minimum: 1,
    default: 1
  })
  @Prop({ default: 1, min: 1 })
  cantidad: number;

  @ApiProperty({
    description: 'Precio unitario del item',
    example: 150.00,
    minimum: 0,
    required: true
  })
  @Prop({ required: true, min: 0 })
  precio_unitario: number;

  @ApiProperty({
    description: 'Precio total (cantidad * precio_unitario)',
    example: 150.00,
    minimum: 0,
    required: true
  })
  @Prop({ required: true, min: 0 })
  precio_total: number;

  @ApiPropertyOptional({
    description: 'Identificador único del pago en el sistema de pagos externo',
    example: 'pay_abc123xyz789'
  })
  @Prop()
  identificador_pago: string;

  @ApiPropertyOptional({
    description: 'Observaciones adicionales del detalle de inscripción',
    example: 'Inscripción con descuento por promoción especial'
  })
  @Prop()
  observaciones: string;

  @ApiProperty({
    description: 'Estado del detalle de inscripción',
    example: 'pendiente',
    enum: ['pendiente', 'confirmado', 'cancelado'],
    default: 'pendiente'
  })
  @Prop({ 
    default: 'pendiente', 
    enum: ['pendiente', 'confirmado', 'cancelado'] 
  })
  estado: string;

  // Campos automáticos de timestamps
  @ApiProperty({
    description: 'Fecha de creación automática',
    example: '2024-01-15T10:30:00.000Z'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Fecha de última actualización automática',
    example: '2024-01-15T10:30:00.000Z'
  })
  updatedAt: Date;
}

export const DetalleInscripcionSchema = SchemaFactory.createForClass(DetalleInscripcion);

// Índices
DetalleInscripcionSchema.index({ id_inscripcion: 1 });
DetalleInscripcionSchema.index({ id_taller: 1 });
DetalleInscripcionSchema.index({ id_bloque: 1 });
DetalleInscripcionSchema.index({ estado: 1 });

// Validación: debe tener id_taller o id_bloque
DetalleInscripcionSchema.pre('save', function(next) {
  if (!this.id_taller && !this.id_bloque) {
    next(new Error('Debe especificar id_taller o id_bloque'));
  }
  next();
});