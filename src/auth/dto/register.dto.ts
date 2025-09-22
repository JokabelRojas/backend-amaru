import { IsEmail, IsString, MinLength, IsNotEmpty, IsOptional } from 'class-validator';

export class RegisterDto {
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
  email: string; // tiene que tener @ y tiene que terminar en .com 

  @IsString()
  @MinLength(6)
  password: string; // que tenga minimo 6 caracteres

  @IsString()
  telefono?: string; 

  @IsString()
  direccion?: string;

  @IsString()
  @IsOptional() 
  id_rol?: string; // el id_rol es opcional, por que al final lo estamos enviando por defecto en el servicio.
}