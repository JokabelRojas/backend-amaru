import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Subcategoria } from './subcategoria.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Categoria } from './categoria.entity';

@Schema({ 
  timestamps: true
})
export class Taller extends Document {
  @ApiProperty({
    description: 'Nombre del taller',
    example: 'Introducción a la Programación Web',
    required: true
  })
  @Prop({ required: true, trim: true })
  nombre: string;

  @ApiPropertyOptional({
    description: 'Descripción del taller',
    example: 'Aprende los fundamentos de HTML, CSS y JavaScript para crear sitios web modernos'
  })
  @Prop({ trim: true })
  descripcion: string;

  @ApiProperty({
    description: 'Fecha de inicio del taller',
    example: '2024-03-01T09:00:00.000Z',
    required: true
  })
  @Prop({ required: true })
  fecha_inicio: Date;

  @ApiProperty({
    description: 'Fecha de fin del taller',
    example: '2024-03-15T18:00:00.000Z',
    required: true
  })
  @Prop({ required: true })
  fecha_fin: Date;

  @ApiProperty({
    description: 'Horario del taller',
    example: 'Lunes y Miércoles de 18:00 a 20:00',
    required: true
  })
  @Prop({ required: true })
  horario: string;

  @ApiProperty({
    description: 'Modalidad del taller',
    example: 'virtual',
    enum: ['presencial', 'virtual', 'hibrido'],
    required: true
  })
  @Prop({ 
    required: true, 
    enum: ['presencial', 'virtual', 'hibrido'] 
  })
  modalidad: string;

  @ApiProperty({
    description: 'Duración del taller en horas',
    example: 20,
    minimum: 1,
    required: true
  })
  @Prop({ required: true, min: 1 })
  duracion: number;

  @ApiProperty({
    description: 'Precio del taller',
    example: 150.00,
    minimum: 0,
    required: true
  })
  @Prop({ required: true, min: 0 })
  precio: number;

  @ApiProperty({
    description: 'Cupo total de participantes',
    example: 30,
    minimum: 1,
    required: true
  })
  @Prop({ required: true, min: 1 })
  cupo_total: number;

  @ApiProperty({
    description: 'Cupo disponible de participantes',
    example: 15,
    minimum: 0,
    required: true
  })
  @Prop({ required: true, min: 0 })
  cupo_disponible: number;

    @ApiProperty({
    description: 'ID de la categoría a la que pertenece el taller',
    example: '507f1f77bcf86cd799439011',
    required: true
  })
  @Prop({ 
    type: MongooseSchema.Types.ObjectId, 
    ref: 'Categoria', 
    required: true 
  })
  id_categoria: Categoria;

  @ApiProperty({
    description: 'ID de la subcategoría a la que pertenece el taller',
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
    description: 'Estado del taller',
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
    description: 'URL de la imagen del taller',
    example: 'https://ejemplo.com/imagen-taller.jpg'
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

export const TallerSchema = SchemaFactory.createForClass(Taller);

// Índices
TallerSchema.index({ id_subcategoria: 1 });
TallerSchema.index({ estado: 1 });
TallerSchema.index({ fecha_inicio: 1 });
TallerSchema.index({ modalidad: 1 });

// Middleware
TallerSchema.pre('save', function(next) {
  const taller = this as any;
  
  if (taller.fecha_fin <= taller.fecha_inicio) {
    next(new Error('La fecha de fin debe ser posterior a la fecha de inicio'));
  }
  if (taller.cupo_disponible > taller.cupo_total) {
    next(new Error('El cupo disponible no puede ser mayor al cupo total'));
  }
  next();
});