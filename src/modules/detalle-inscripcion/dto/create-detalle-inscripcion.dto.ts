import { IsMongoId, IsNotEmpty, IsOptional, IsNumber, IsString, IsIn, Min } from 'class-validator';

export class CreateDetalleInscripcionDto {
  @IsMongoId()
  @IsNotEmpty()
  id_inscripcion: string;

  @IsMongoId()
  @IsOptional()
  id_taller?: string;

  @IsMongoId()
  @IsOptional()
  id_bloque?: string;

  @IsNumber()
  @Min(1)
  @IsOptional()
  cantidad?: number;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  precio_unitario: number;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  precio_total: number;

  @IsString()
  @IsOptional()
  identificador_pago?: string;

  @IsString()
  @IsOptional()
  observaciones?: string;

  @IsString()
  @IsIn(['pendiente', 'confirmado', 'cancelado'])
  @IsOptional()
  estado?: string;
}