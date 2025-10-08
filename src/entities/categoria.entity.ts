import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class Categoria extends Document {
  @ApiProperty({
    description: 'Nombre único de la categoría',
    example: 'Electrónicos',
    required: true
  })
  @Prop({ required: true, unique: true })
  nombre: string;

  @ApiProperty({
    description: 'Tipo de categoría',
    example: 'productos',
    enum: ['productos', 'servicios', 'mixto']
  })
  @Prop({ required: true })
  tipo: string;

  @ApiPropertyOptional({
    description: 'Descripción de la categoría',
    example: 'Productos electrónicos y dispositivos tecnológicos'
  })
  @Prop()
  descripcion: string;

  @ApiProperty({
    description: 'Estado de la categoría',
    example: 'activo',
    enum: ['activo', 'inactivo'],
    default: 'activo'
  })
  @Prop({ default: 'activo' })
  estado: string;

  @ApiProperty({
    description: 'Fecha de creación automática',
    example: '2024-01-01T00:00:00.000Z'
  })
  @Prop({ default: Date.now })
  createdAt: Date;

  @ApiProperty({
    description: 'Fecha de última actualización automática',
    example: '2024-01-01T00:00:00.000Z'
  })
  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const CategoriaSchema = SchemaFactory.createForClass(Categoria);