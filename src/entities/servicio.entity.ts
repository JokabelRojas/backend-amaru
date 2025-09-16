import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Subcategoria } from './subcategoria.entity';

@Schema({ timestamps: true })
export class Servicio extends Document {
  @Prop({ required: true })
  titulo: string;

  @Prop()
  descripcion: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Subcategoria', required: true })
  id_subcategoria: Subcategoria;

  @Prop({ default: 'activo' })
  estado: string;

  @Prop()
  imagen_url: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ServicioSchema = SchemaFactory.createForClass(Servicio);