import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { DetalleInscripcion } from './detalle-inscripcion.entity';
import { Usuario } from './usuario.entity';

@Schema({ timestamps: true })
export class Pago extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'DetalleInscripcion', required: true })
  id_detalle: DetalleInscripcion;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Usuario', required: true })
  id_usuario_pago: Usuario;

  @Prop({ default: 'PEN' })
  moneda: string;

  @Prop({ required: true })
  metodo_pago: string;

  @Prop()
  transaction_id: string;

  @Prop({ default: Date.now })
  fecha_pago: Date;

  @Prop()
  comprobante_url: string;

  @Prop({ default: 'pendiente' })
  estado: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const PagoSchema = SchemaFactory.createForClass(Pago);