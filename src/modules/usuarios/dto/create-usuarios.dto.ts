import { IsEmail, IsString, MinLength, IsNotEmpty, IsMongoId } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUsuarioDto {
  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Juan'
  })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({
    description: 'Apellido del usuario',
    example: 'Pérez'
  })
  @IsString()
  @IsNotEmpty()
  apellido: string;

  @ApiProperty({
    description: 'Documento Nacional de Identidad',
    example: '12345678'
  })
  @IsString()
  @IsNotEmpty()
  dni: string;

  @ApiProperty({
    description: 'Correo electrónico válido',
    example: 'juan.perez@example.com'
  })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    description: 'Número de teléfono',
    example: '+5491112345678'
  })
  @IsString()
  telefono?: string;

  @ApiPropertyOptional({
    description: 'Dirección del usuario',
    example: 'Calle Falsa 123, Ciudad, País'
  })
  @IsString()
  direccion?: string;

  @ApiProperty({
    description: 'Contraseña con mínimo 6 caracteres',
    minLength: 6,
    example: 'miclave123'
  })
  @IsString()
  @MinLength(6)
  contrasena: string;

  @ApiProperty({
    description: 'ID del rol del usuario (ObjectId de MongoDB)',
    example: '507f1f77bcf86cd799439011'
  })
  @IsMongoId()
  id_rol: string;
}