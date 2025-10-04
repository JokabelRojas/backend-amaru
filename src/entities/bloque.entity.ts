import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Taller } from './taller.entity';

@Schema({ timestamps: true })
export class Bloque extends Document {
  @Prop({ required: true, trim: true })
  nombre: string;

  @Prop({ trim: true })
  descripcion: string;

  @Prop({ required: true })
  fecha_inicio: Date;

  @Prop({ required: true })
  fecha_fin: Date;

  @Prop({ required: true })
  horario: string;

  @Prop({ 
    type: MongooseSchema.Types.ObjectId, 
    ref: 'Taller', 
    required: true 
  })
  id_taller: Taller;

  @Prop({ required: true, min: 1 })
  cupo_total: number;

  @Prop({ required: true, min: 0 })
  cupo_disponible: number;

  @Prop({ 
    default: 'activo', 
    enum: ['activo', 'inactivo'] 
  })
  estado: string;
}

export const BloqueSchema = SchemaFactory.createForClass(Bloque);

// Índices
BloqueSchema.index({ id_taller: 1 });
BloqueSchema.index({ estado: 1 });
BloqueSchema.index({ fecha_inicio: 1 });