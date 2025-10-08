import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Subcategoria } from './subcategoria.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class Servicio extends Document {
  @ApiProperty({
    description: 'Título del servicio',
    example: 'Desarrollo de Aplicaciones Web',
    required: true
  })
  @Prop({ required: true, trim: true })
  titulo: string;

  @ApiPropertyOptional({
    description: 'Descripción detallada del servicio',
    example: 'Desarrollo de aplicaciones web modernas utilizando las últimas tecnologías como React, Node.js y MongoDB'
  })
  @Prop({ trim: true })
  descripcion: string;

  @ApiProperty({
    description: 'ID de la subcategoría a la que pertenece el servicio',
    example: '507f1f77bcf86cd799439011',
    required: true
  })
  @Prop({ 
    type: MongooseSchema.Types.ObjectId, 
    ref: 'Subcategoria', 
    required: true 
  })
  id_subcategoria: Subcategoria;

  @ApiProperty({
    description: 'Estado del servicio',
    example: 'activo',
    enum: ['activo', 'inactivo'],
    default: 'activo'
  })
  @Prop({ 
    default: 'activo', 
    enum: ['activo', 'inactivo'] 
  })
  estado: string;

  @ApiPropertyOptional({
    description: 'URL de la imagen del servicio',
    example: 'https://ejemplo.com/imagen-servicio.jpg'
  })
  @Prop()
  imagen_url: string;

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

export const ServicioSchema = SchemaFactory.createForClass(Servicio);

// Índices
ServicioSchema.index({ id_subcategoria: 1 });
ServicioSchema.index({ estado: 1 });