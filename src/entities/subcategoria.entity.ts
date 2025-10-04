import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Categoria } from './categoria.entity';

@Schema({ 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})
export class Subcategoria extends Document {
  @Prop({ required: true, trim: true })
  nombre: string;

  @Prop({ trim: true })
  descripcion: string;

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

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const SubcategoriaSchema = SchemaFactory.createForClass(Subcategoria);

// Índices para mejor performance
SubcategoriaSchema.index({ id_categoria: 1 });
SubcategoriaSchema.index({ estado: 1 });