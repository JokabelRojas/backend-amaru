import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsIn, Min, IsString } from 'class-validator';

export class CreateInscripcionDto {
  @IsMongoId()
  @IsNotEmpty()
  id_usuario: string;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  total: number;

  @IsString()
  @IsIn(['PEN', 'USD'])
  @IsOptional()
  moneda?: string;

  @IsString()
  @IsIn(['pendiente', 'pagado', 'cancelado', 'completado'])
  @IsOptional()
  estado?: string;
}