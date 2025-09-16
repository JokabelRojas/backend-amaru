import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Inscripcion } from './inscripcion.entity';
import { Taller } from './taller.entity';
import { Bloque } from './bloque.entity';

@Schema({ timestamps: true })
export class DetalleInscripcion extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Inscripcion', required: true })
  id_inscripcion: Inscripcion;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Taller' })
  id_taller: Taller;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Bloque' })
  id_bloque: Bloque;

  @Prop({ default: 1 })
  cantidad: number;

  @Prop({ required: true })
  precio_unitario: number;

  @Prop({ required: true })
  precio_total: number;

  @Prop()
  identificador_pago: string;

  @Prop()
  observaciones: string;

  @Prop({ default: 'pendiente' })
  estado: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const DetalleInscripcionSchema = SchemaFactory.createForClass(DetalleInscripcion);