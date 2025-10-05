import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Inscripcion } from './inscripcion.entity';
import { Taller } from './taller.entity';
import { Bloque } from './bloque.entity';

@Schema({ timestamps: true })
export class DetalleInscripcion extends Document {
  @Prop({ 
    type: MongooseSchema.Types.ObjectId, 
    ref: 'Inscripcion', 
    required: true 
  })
  id_inscripcion: Inscripcion;

  @Prop({ 
    type: MongooseSchema.Types.ObjectId, 
    ref: 'Taller' 
  })
  id_taller: Taller;

  @Prop({ 
    type: MongooseSchema.Types.ObjectId, 
    ref: 'Bloque' 
  })
  id_bloque: Bloque;

  @Prop({ default: 1, min: 1 })
  cantidad: number;

  @Prop({ required: true, min: 0 })
  precio_unitario: number;

  @Prop({ required: true, min: 0 })
  precio_total: number;

  @Prop()
  identificador_pago: string;

  @Prop()
  observaciones: string;

  @Prop({ 
    default: 'pendiente', 
    enum: ['pendiente', 'confirmado', 'cancelado'] 
  })
  estado: string;
}

export const DetalleInscripcionSchema = SchemaFactory.createForClass(DetalleInscripcion);

// Índices
DetalleInscripcionSchema.index({ id_inscripcion: 1 });
DetalleInscripcionSchema.index({ id_taller: 1 });
DetalleInscripcionSchema.index({ id_bloque: 1 });
DetalleInscripcionSchema.index({ estado: 1 });

// Validación: debe tener id_taller o id_bloque
DetalleInscripcionSchema.pre('save', function(next) {
  if (!this.id_taller && !this.id_bloque) {
    next(new Error('Debe especificar id_taller o id_bloque'));
  }
  next();
});