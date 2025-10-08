import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class Rol extends Document {
  @ApiProperty({
    description: 'ID único del rol',
    example: '507f1f77bcf86cd799439011'
  })
  declare _id: Types.ObjectId;

  @ApiProperty({
    description: 'Nombre único del rol',
    example: 'ADMIN'
  })
  @Prop({ required: true, unique: true })
  nombre: string;

  @ApiPropertyOptional({
    description: 'Descripción del rol',
    example: 'Rol con permisos de administrador'
  })
  @Prop()
  descripcion: string;

  @ApiPropertyOptional({
    description: 'Lista de permisos del rol',
    example: ['crear_usuario', 'editar_usuario', 'eliminar_usuario'],
    type: [String]
  })
  @Prop({ type: [String], default: [] })
  permisos: string[];

  @ApiPropertyOptional({
    description: 'Estado del rol (activo/inactivo)',
    example: true,
    default: true
  })
  @Prop({ default: true })
  estado: boolean;

  @ApiProperty({
    description: 'Fecha de creación del rol',
    example: '2024-01-01T00:00:00.000Z'
  })
  @Prop({ default: Date.now })
  createdAt: Date;

  @ApiProperty({
    description: 'Fecha de última actualización del rol',
    example: '2024-01-01T00:00:00.000Z'
  })
  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const RolSchema = SchemaFactory.createForClass(Rol);