import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Subcategoria } from './subcategoria.entity';

@Schema({ 
  timestamps: true
})
export class Taller extends Document {
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
    required: true, 
    enum: ['presencial', 'virtual', 'hibrido'] 
  })
  modalidad: string;

  @Prop({ required: true, min: 1 })
  duracion: number;

  @Prop({ required: true, min: 0 })
  precio: number;

  @Prop({ required: true, min: 1 })
  cupo_total: number;

  @Prop({ required: true, min: 0 })
  cupo_disponible: number;

  @Prop({ 
    type: MongooseSchema.Types.ObjectId, 
    ref: 'Subcategoria', 
    required: true 
  })
  id_subcategoria: Subcategoria;

  @Prop({ 
    default: 'activo', 
    enum: ['activo', 'inactivo'] 
  })
  estado: string;

  @Prop()
  imagen_url: string;
}

export const TallerSchema = SchemaFactory.createForClass(Taller);

// Índices
TallerSchema.index({ id_subcategoria: 1 });
TallerSchema.index({ estado: 1 });
TallerSchema.index({ fecha_inicio: 1 });
TallerSchema.index({ modalidad: 1 });

// Middleware
TallerSchema.pre('save', function(next) {
  const taller = this as any;
  
  if (taller.fecha_fin <= taller.fecha_inicio) {
    next(new Error('La fecha de fin debe ser posterior a la fecha de inicio'));
  }
  if (taller.cupo_disponible > taller.cupo_total) {
    next(new Error('El cupo disponible no puede ser mayor al cupo total'));
  }
  next();
});