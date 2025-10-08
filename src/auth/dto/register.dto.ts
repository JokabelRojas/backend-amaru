import { IsEmail, IsString, MinLength, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
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

  @ApiProperty({
    description: 'Contraseña con mínimo 6 caracteres',
    minLength: 6,
    example: 'miclave123'
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({
    description: 'Número de teléfono',
    example: '+5491112345678'
  })
  @IsString()
  @IsOptional()
  telefono?: string;

  @ApiPropertyOptional({
    description: 'Dirección del usuario',
    example: 'Calle Falsa 123'
  })
  @IsString()
  @IsOptional()
  direccion?: string;

  @ApiPropertyOptional({
    description: 'ID del rol del usuario (opcional)',
    example: '65d8a1b2c3d4e5f678901234'
  })
  @IsString()
  @IsOptional()
  id_rol?: string;
}