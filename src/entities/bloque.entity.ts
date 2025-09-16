import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Taller } from './taller.entity';

@Schema({ timestamps: true })
export class Bloque extends Document {
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

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Taller', required: true })
  id_taller: Taller;

  @Prop({ required: true })
  cupo_total: number;

  @Prop({ required: true })
  cupo_disponible: number;

  @Prop({ default: 'activo' })
  estado: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const BloqueSchema = SchemaFactory.createForClass(Bloque);