import { IsString, IsNotEmpty, IsOptional, IsMongoId, IsDateString, IsIn, IsUrl } from 'class-validator';

export class CreateFestivalDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsDateString()
  @IsNotEmpty()
  fecha_evento: Date;

  @IsString()
  @IsNotEmpty()
  lugar: string;

  @IsString()
  @IsNotEmpty()
  organizador: string;

  @IsString()
  @IsNotEmpty()
  tipo: string;

  @IsMongoId()
  @IsNotEmpty()
  id_categoria: string;

  @IsString()
  @IsIn(['activo', 'inactivo'])
  @IsOptional()
  estado?: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  imagen_url?: string;
}