import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Taller } from './taller.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class Bloque extends Document {
  @ApiProperty({
    description: 'Nombre del bloque',
    example: 'Bloque 1: Fundamentos de HTML',
    required: true
  })
  @Prop({ required: true, trim: true })
  nombre: string;

  @ApiPropertyOptional({
    description: 'Descripción del bloque',
    example: 'En este bloque aprenderás las etiquetas básicas de HTML5 y estructura semántica'
  })
  @Prop({ trim: true })
  descripcion: string;

  @ApiProperty({
    description: 'Fecha de inicio del bloque',
    example: '2024-03-01T09:00:00.000Z',
    required: true
  })
  @Prop({ required: true })
  fecha_inicio: Date;

  @ApiProperty({
    description: 'Fecha de fin del bloque',
    example: '2024-03-08T18:00:00.000Z',
    required: true
  })
  @Prop({ required: true })
  fecha_fin: Date;

  @ApiProperty({
    description: 'Horario del bloque',
    example: 'Lunes de 18:00 a 20:00',
    required: true
  })
  @Prop({ required: true })
  horario: string;

  @ApiProperty({
    description: 'ID del taller al que pertenece el bloque',
    example: '507f1f77bcf86cd799439011',
    required: true
  })
  @Prop({ 
    type: MongooseSchema.Types.ObjectId, 
    ref: 'Taller', 
    required: true 
  })
  id_taller: Taller;

  @ApiProperty({
    description: 'Cupo total del bloque',
    example: 25,
    minimum: 1,
    required: true
  })
  @Prop({ required: true, min: 1 })
  cupo_total: number;

  @ApiProperty({
    description: 'Cupo disponible del bloque',
    example: 15,
    minimum: 0,
    required: true
  })
  @Prop({ required: true, min: 0 })
  cupo_disponible: number;

  @ApiProperty({
    description: 'Estado del bloque',
    example: 'activo',
    enum: ['activo', 'inactivo'],
    default: 'activo'
  })
  @Prop({ 
    default: 'activo', 
    enum: ['activo', 'inactivo'] 
  })
  estado: string;

  // Campos automáticos de timestamps
  @ApiProperty({
    description: 'Fecha de creación automática',
    example: '2024-01-01T00:00:00.000Z'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Fecha de última actualización automática',
    example: '2024-01-01T00:00:00.000Z'
  })
  updatedAt: Date;
}

export const BloqueSchema = SchemaFactory.createForClass(Bloque);

// Índices
BloqueSchema.index({ id_taller: 1 });
BloqueSchema.index({ estado: 1 });
BloqueSchema.index({ fecha_inicio: 1 });