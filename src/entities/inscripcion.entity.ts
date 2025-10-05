import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Usuario } from './usuario.entity';

@Schema({ timestamps: true })
export class Inscripcion extends Document {
  @Prop({ 
    type: MongooseSchema.Types.ObjectId, 
    ref: 'Usuario', 
    required: true 
  })
  id_usuario: Usuario;

  @Prop({ default: Date.now })
  fecha_inscripcion: Date;

  @Prop({ required: true, min: 0 })
  total: number;

  @Prop({ 
    default: 'PEN', 
    enum: ['PEN', 'USD'] 
  })
  moneda: string;

  @Prop({ 
    default: 'pendiente', 
    enum: ['pendiente', 'pagado', 'cancelado', 'completado'] 
  })
  estado: string;
}

export const InscripcionSchema = SchemaFactory.createForClass(Inscripcion);

// Índices
InscripcionSchema.index({ id_usuario: 1 });
InscripcionSchema.index({ estado: 1 });
InscripcionSchema.index({ fecha_inscripcion: 1 });