import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { Rol } from './rol.entity';
import * as bcrypt from 'bcryptjs';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export interface UsuarioDocument extends Usuario {
  comparePassword(password: string): Promise<boolean>;
}

@Schema({ timestamps: true })
export class Usuario extends Document {
  @ApiProperty({
    description: 'ID único del usuario',
    example: '507f1f77bcf86cd799439011'
  })
  declare _id: Types.ObjectId;

  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Juan'
  })
  @Prop({ required: true })
  nombre: string;

  @ApiProperty({
    description: 'Apellido del usuario',
    example: 'Pérez'
  })
  @Prop({ required: true })
  apellido: string;

  @ApiProperty({
    description: 'Documento Nacional de Identidad (único)',
    example: '12345678'
  })
  @Prop({ required: true, unique: true })
  dni: string;

  @ApiProperty({
    description: 'Correo electrónico (único)',
    example: 'juan.perez@example.com'
  })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiPropertyOptional({
    description: 'Número de teléfono',
    example: '+5491112345678'
  })
  @Prop()
  telefono: string;

  @ApiPropertyOptional({
    description: 'Dirección del usuario',
    example: 'Calle Falsa 123, Ciudad, País'
  })
  @Prop()
  direccion: string;

  @ApiProperty({
    description: 'Contraseña encriptada',
    example: '$2b$12$hashedpasswordexample123456789'
  })
  @Prop({ required: true })
  contrasena: string;

  @ApiProperty({
    description: 'Estado del usuario',
    example: 'activo',
    enum: ['activo', 'inactivo', 'suspendido'],
    default: 'activo'
  })
  @Prop({ default: 'activo' })
  estado: string;

  @ApiProperty({
    description: 'Fecha de registro del usuario',
    example: '2024-01-01T00:00:00.000Z'
  })
  @Prop({ default: Date.now })
  fecha_registro: Date;

  @ApiProperty({
    description: 'ID del rol asignado al usuario',
    example: '507f1f77bcf86cd799439012'
  })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Rol', required: true })
  id_rol: Types.ObjectId;

  @ApiPropertyOptional({
    description: 'Fecha de eliminación suave (soft delete)',
    example: '2024-12-31T23:59:59.999Z'
  })
  @Prop()
  deleted_at?: Date;

  // Campos automáticos de timestamps
  @ApiProperty({
    description: 'Fecha de creación automática',
    example: '2024-01-01T00:00:00.000Z'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Fecha de última actualización automática',
    example: '2024-01-01T00:00:00.000Z'
  })
  updatedAt: Date;
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