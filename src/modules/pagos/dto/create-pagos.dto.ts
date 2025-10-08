import { IsMongoId, IsNotEmpty, IsOptional, IsString, IsIn, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePagoDto {
  @ApiProperty({
    description: 'ID del detalle de inscripción asociado al pago',
    example: '507f1f77bcf86cd799439011',
    required: true
  })
  @IsMongoId()
  @IsNotEmpty()
  id_detalle: string;

  @ApiProperty({
    description: 'ID del usuario que realiza el pago',
    example: '507f1f77bcf86cd799439012',
    required: true
  })
  @IsMongoId()
  @IsNotEmpty()
  id_usuario_pago: string;

  @ApiPropertyOptional({
    description: 'Moneda del pago',
    example: 'PEN',
    enum: ['PEN', 'USD'],
    default: 'PEN'
  })
  @IsString()
  @IsIn(['PEN', 'USD'])
  @IsOptional()
  moneda?: string;

  @ApiProperty({
    description: 'Método de pago utilizado',
    example: 'tarjeta_credito',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  metodo_pago: string;

  @ApiPropertyOptional({
    description: 'ID único de la transacción en el procesador de pagos',
    example: 'txn_abc123xyz789'
  })
  @IsString()
  @IsOptional()
  transaction_id?: string;

  @ApiPropertyOptional({
    description: 'URL del comprobante de pago',
    example: 'https://ejemplo.com/comprobantes/comprobante-123.pdf'
  })
  @IsString()
  @IsUrl()
  @IsOptional()
  comprobante_url?: string;

  @ApiPropertyOptional({
    description: 'Estado del pago',
    example: 'pendiente',
    enum: ['pendiente', 'completado', 'fallido', 'reembolsado'],
    default: 'pendiente'
  })
  @IsString()
  @IsIn(['pendiente', 'completado', 'fallido', 'reembolsado'])
  @IsOptional()
  estado?: string;
}