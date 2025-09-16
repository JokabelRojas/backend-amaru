import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { Rol } from './rol.entity';
import * as bcrypt from 'bcryptjs';

export interface UsuarioDocument extends Usuario {
  comparePassword(password: string): Promise<boolean>;
}

@Schema({ timestamps: true })
export class Usuario extends Document {
  declare _id: Types.ObjectId;

  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  apellido: string;

  @Prop({ required: true, unique: true })
  dni: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  telefono: string;

  @Prop()
  direccion: string;

  @Prop({ required: true })
  contrasena: string;

  @Prop({ default: 'activo' })
  estado: string;

  @Prop({ default: Date.now })
  fecha_registro: Date;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Rol', required: true })
  id_rol: Types.ObjectId;

  @Prop()
  deleted_at?: Date;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);

// Añadir el método comparePassword al schema
UsuarioSchema.methods.comparePassword = async function(password: string): Promise<boolean> {
  return bcrypt.compare(password, this.contrasena);
};

// Hash password antes de guardar
UsuarioSchema.pre('save', async function (next) {
  if (!this.isModified('contrasena')) return next();
  this.contrasena = await bcrypt.hash(this.contrasena, 12);
  next();
});