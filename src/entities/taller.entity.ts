import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Subcategoria } from './subcategoria.entity';

@Schema({ timestamps: true })
export class Taller extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop()
  descripcion: string;

  @Prop({ required: true })
  fecha_inicio: Date;

  @Prop({ required: true })
  fecha_fin: Date;

  @Prop({ required: true })
  horario: string;

  @Prop({ required: true })
  modalidad: string;

  @Prop({ required: true })
  duracion: number;

  @Prop({ required: true })
  precio: number;

  @Prop({ required: true })
  cupo_total: number;

  @Prop({ required: true })
  cupo_disponible: number;

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

export const TallerSchema = SchemaFactory.createForClass(Taller);