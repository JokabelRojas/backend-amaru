import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Categoria } from './categoria.entity';

@Schema({ timestamps: true })
export class Subcategoria extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop()
  descripcion: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Categoria', required: true })
  id_categoria: Categoria;

  @Prop({ default: 'activo' })
  estado: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const SubcategoriaSchema = SchemaFactory.createForClass(Subcategoria);