import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Rol extends Document {
  declare _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  nombre: string;

  @Prop()
  descripcion: string;

  @Prop({ type: [String], default: [] })
  permisos: string[];

  @Prop({ default: true })
  estado: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const RolSchema = SchemaFactory.createForClass(Rol);