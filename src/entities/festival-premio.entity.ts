import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Categoria } from './categoria.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class Festival extends Document {
  @ApiProperty({
    description: 'Título del festival',
    example: 'Festival de Música Electrónica 2024',
    required: true
  })
  @Prop({ required: true, trim: true })
  titulo: string;

  @ApiPropertyOptional({
    description: 'Descripción detallada del festival',
    example: 'El evento más esperado del año con los mejores DJs internacionales y producciones audiovisuales de vanguardia'
  })
  @Prop({ trim: true })
  descripcion: string;

  @ApiProperty({
    description: 'Fecha del evento del festival',
    example: '2024-07-15T20:00:00.000Z',
    required: true
  })
  @Prop({ required: true })
  fecha_evento: Date;

  @ApiProperty({
    description: 'Lugar donde se realizará el festival',
    example: 'Estadio Nacional, Lima',
    required: true
  })
  @Prop({ required: true, trim: true })
  lugar: string;

  @ApiProperty({
    description: 'Organizador del festival',
    example: 'Empresa de Eventos S.A.',
    required: true
  })
  @Prop({ required: true, trim: true })
  organizador: string;

  @ApiProperty({
    description: 'Tipo de festival',
    example: 'musical',
    required: true
  })
  @Prop({ required: true, trim: true })
  tipo: string;

  @ApiProperty({
    description: 'ID de la categoría a la que pertenece el festival',
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
    description: 'Estado del festival',
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
    description: 'URL de la imagen del festival',
    example: 'https://ejemplo.com/imagen-festival.jpg'
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

export const FestivalSchema = SchemaFactory.createForClass(Festival);

// Índices
FestivalSchema.index({ id_categoria: 1 });
FestivalSchema.index({ estado: 1 });
FestivalSchema.index({ fecha_evento: 1 });
FestivalSchema.index({ tipo: 1 });