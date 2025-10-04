import { IsString, IsNotEmpty, IsOptional, IsMongoId, IsNumber, IsDateString, IsIn, Min } from 'class-validator';

export class CreateBloqueDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsDateString()
  @IsNotEmpty()
  fecha_inicio: Date;

  @IsDateString()
  @IsNotEmpty()
  fecha_fin: Date;

  @IsString()
  @IsNotEmpty()
  horario: string;

  @IsMongoId()
  @IsNotEmpty()
  id_taller: string;

  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  cupo_total: number;

  @IsString()
  @IsIn(['activo', 'inactivo'])
  @IsOptional()
  estado?: string;
}