import { IsString, IsNotEmpty, IsOptional, IsMongoId, IsIn, IsUrl } from 'class-validator';

export class CreateServicioDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsMongoId()
  @IsNotEmpty()
  id_subcategoria: string;

  @IsString()
  @IsIn(['activo', 'inactivo'])
  @IsOptional()
  estado?: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  imagen_url?: string;
}