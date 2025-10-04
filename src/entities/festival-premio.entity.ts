import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Categoria } from './categoria.entity';

@Schema({ timestamps: true })
export class Festival extends Document {
  @Prop({ required: true, trim: true })
  titulo: string;

  @Prop({ trim: true })
  descripcion: string;

  @Prop({ required: true })
  fecha_evento: Date;

  @Prop({ required: true, trim: true })
  lugar: string;

  @Prop({ required: true, trim: true })
  organizador: string;

  @Prop({ required: true, trim: true })
  tipo: string;

  @Prop({ 
    type: MongooseSchema.Types.ObjectId, 
    ref: 'Categoria', 
    required: true 
  })
  id_categoria: Categoria;

  @Prop({ 
    default: 'activo', 
    enum: ['activo', 'inactivo'] 
  })
  estado: string;

  @Prop()
  imagen_url: string;
}

export const FestivalSchema = SchemaFactory.createForClass(Festival);

// Índices
FestivalSchema.index({ id_categoria: 1 });
FestivalSchema.index({ estado: 1 });
FestivalSchema.index({ fecha_evento: 1 });
FestivalSchema.index({ tipo: 1 });