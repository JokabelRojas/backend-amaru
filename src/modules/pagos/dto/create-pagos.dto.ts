import { IsMongoId, IsNotEmpty, IsOptional, IsString, IsIn, IsUrl } from 'class-validator';

export class CreatePagoDto {
  @IsMongoId()
  @IsNotEmpty()
  id_detalle: string;

  @IsMongoId()
  @IsNotEmpty()
  id_usuario_pago: string;

  @IsString()
  @IsIn(['PEN', 'USD'])
  @IsOptional()
  moneda?: string;

  @IsString()
  @IsNotEmpty()
  metodo_pago: string;

  @IsString()
  @IsOptional()
  transaction_id?: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  comprobante_url?: string;

  @IsString()
  @IsIn(['pendiente', 'completado', 'fallido', 'reembolsado'])
  @IsOptional()
  estado?: string;
}