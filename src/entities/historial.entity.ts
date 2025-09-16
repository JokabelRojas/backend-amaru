import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Usuario } from './usuario.entity';
import { DetalleInscripcion } from './detalle-inscripcion.entity';

@Schema({ timestamps: true })
export class Historial extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Usuario', required: true })
  id_usuario: Usuario;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'DetalleInscripcion' })
  id_detalle: DetalleInscripcion;

  @Prop({ default: Date.now })
  fecha_accion: Date;

  @Prop({ required: true })
  tipo_accion: string;

  @Prop()
  observacion: string;

  @Prop()
  origen: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const HistorialSchema = SchemaFactory.createForClass(Historial);