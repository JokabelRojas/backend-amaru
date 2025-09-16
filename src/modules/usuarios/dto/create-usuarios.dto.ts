import { IsEmail, IsString, MinLength, IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellido: string;

  @IsString()
  @IsNotEmpty()
  dni: string;

  @IsEmail()
  email: string;

  @IsString()
  telefono?: string;

  @IsString()
  direccion?: string;

  @IsString()
  @MinLength(6)
  contrasena: string;

  @IsMongoId()
  id_rol: string;
}