import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Categoria } from './categoria.entity';

@Schema({ timestamps: true })
export class FestivalPremio extends Document {
  @Prop({ required: true })
  titulo: string;

  @Prop()
  descripcion: string;

  @Prop({ required: true })
  fecha_evento: Date;

  @Prop({ required: true })
  lugar: string;

  @Prop({ required: true })
  organizador: string;

  @Prop({ required: true })
  tipo: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Categoria', required: true })
  id_categoria: Categoria;

  @Prop({ default: 'activo' })
  estado: string;

  @Prop()
  imagen_url: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const FestivalPremioSchema = SchemaFactory.createForClass(FestivalPremio);