import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Subcategoria } from './subcategoria.entity';

@Schema({ timestamps: true })
export class Servicio extends Document {
  @Prop({ required: true, trim: true })
  titulo: string;

  @Prop({ trim: true })
  descripcion: string;

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

export const ServicioSchema = SchemaFactory.createForClass(Servicio);

// Índices
ServicioSchema.index({ id_subcategoria: 1 });
ServicioSchema.index({ estado: 1 });