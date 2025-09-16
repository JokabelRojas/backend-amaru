import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Usuario } from './usuario.entity';

@Schema({ timestamps: true })
export class Inscripcion extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Usuario', required: true })
  id_usuario: Usuario;

  @Prop({ default: Date.now })
  fecha_inscripcion: Date;

  @Prop({ required: true })
  total: number;

  @Prop({ default: 'PEN' })
  moneda: string;

  @Prop({ default: 'pendiente' })
  estado: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const InscripcionSchema = SchemaFactory.createForClass(Inscripcion);