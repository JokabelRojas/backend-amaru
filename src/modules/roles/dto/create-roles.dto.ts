import { IsString, IsNotEmpty, IsArray, IsBoolean, IsOptional } from 'class-validator';

export class CreateRolDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsArray()
  @IsOptional()
  permisos?: string[];

  @IsBoolean()
  @IsOptional()
  estado?: boolean;
}