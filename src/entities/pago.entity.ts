import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { DetalleInscripcion } from './detalle-inscripcion.entity';
import { Usuario } from './usuario.entity';

@Schema({ timestamps: true })
export class Pago extends Document {
  @Prop({ 
    type: MongooseSchema.Types.ObjectId, 
    ref: 'DetalleInscripcion', 
    required: true 
  })
  id_detalle: DetalleInscripcion;

  @Prop({ 
    type: MongooseSchema.Types.ObjectId, 
    ref: 'Usuario', 
    required: true 
  })
  id_usuario_pago: Usuario;

  @Prop({ 
    default: 'PEN', 
    enum: ['PEN', 'USD'] 
  })
  moneda: string;

  @Prop({ required: true })
  metodo_pago: string;

  @Prop()
  transaction_id: string;

  @Prop({ default: Date.now })
  fecha_pago: Date;

  @Prop()
  comprobante_url: string;

  @Prop({ 
    default: 'pendiente', 
    enum: ['pendiente', 'completado', 'fallido', 'reembolsado'] 
  })
  estado: string;
}

export const PagoSchema = SchemaFactory.createForClass(Pago);

// Índices
PagoSchema.index({ id_detalle: 1 });
PagoSchema.index({ id_usuario_pago: 1 });
PagoSchema.index({ estado: 1 });
PagoSchema.index({ fecha_pago: 1 });