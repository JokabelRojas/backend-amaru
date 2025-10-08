import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Categoria } from './categoria.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Schema({ 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})
export class Subcategoria extends Document {
  @ApiProperty({
    description: 'Nombre de la subcategoría',
    example: 'Smartphones',
    required: true
  })
  @Prop({ required: true, trim: true })
  nombre: string;

  @ApiPropertyOptional({
    description: 'Descripción de la subcategoría',
    example: 'Teléfonos inteligentes y dispositivos móviles'
  })
  @Prop({ trim: true })
  descripcion: string;

  @ApiProperty({
    description: 'ID de la categoría padre',
    example: '507f1f77bcf86cd799439011'
  })
  @Prop({ 
    type: MongooseSchema.Types.ObjectId, 
    ref: 'Categoria', 
    required: true 
  })
  id_categoria: Categoria;

  @ApiProperty({
    description: 'Estado de la subcategoría',
    example: 'activo',
    enum: ['activo', 'inactivo'],
    default: 'activo'
  })
  @Prop({ 
    default: 'activo', 
    enum: ['activo', 'inactivo'] 
  })
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

export const SubcategoriaSchema = SchemaFactory.createForClass(Subcategoria);

// Índices para mejor performance
SubcategoriaSchema.index({ id_categoria: 1 });
SubcategoriaSchema.index({ estado: 1 });