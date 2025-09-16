import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Categoria extends Document {
  @Prop({ required: true, unique: true })
  nombre: string;

  @Prop({ required: true })
  tipo: string;

  @Prop()
  descripcion: string;

  @Prop({ default: 'activo' })
  estado: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const CategoriaSchema = SchemaFactory.createForClass(Categoria);