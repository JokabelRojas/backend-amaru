import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Usuario } from './usuario.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class Inscripcion extends Document {
  @ApiProperty({
    description: 'ID del usuario que realiza la inscripción',
    example: '507f1f77bcf86cd799439011',
    required: true
  })
  @Prop({ 
    type: MongooseSchema.Types.ObjectId, 
    ref: 'Usuario', 
    required: true 
  })
  id_usuario: Usuario;

  @ApiProperty({
    description: 'Fecha de la inscripción',
    example: '2024-01-15T10:30:00.000Z',
    default: 'Fecha actual'
  })
  @Prop({ default: Date.now })
  fecha_inscripcion: Date;

  @ApiProperty({
    description: 'Total a pagar por la inscripción',
    example: 150.00,
    minimum: 0,
    required: true
  })
  @Prop({ required: true, min: 0 })
  total: number;

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
    description: 'Estado de la inscripción',
    example: 'pendiente',
    enum: ['pendiente', 'pagado', 'cancelado', 'completado'],
    default: 'pendiente'
  })
  @Prop({ 
    default: 'pendiente', 
    enum: ['pendiente', 'pagado', 'cancelado', 'completado'] 
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

export const InscripcionSchema = SchemaFactory.createForClass(Inscripcion);

// Índices
InscripcionSchema.index({ id_usuario: 1 });
InscripcionSchema.index({ estado: 1 });
InscripcionSchema.index({ fecha_inscripcion: 1 });