import { IsMongoId, IsNotEmpty, IsOptional, IsNumber, IsString, IsIn, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDetalleInscripcionDto {
  @ApiProperty({
    description: 'ID de la inscripción a la que pertenece el detalle',
    example: '507f1f77bcf86cd799439011',
    required: true
  })
  @IsMongoId()
  @IsNotEmpty()
  id_inscripcion: string;

  @ApiPropertyOptional({
    description: 'ID del taller inscrito (debe especificar id_taller o id_bloque)',
    example: '507f1f77bcf86cd799439012'
  })
  @IsMongoId()
  @IsOptional()
  id_taller?: string;

  @ApiPropertyOptional({
    description: 'ID del bloque inscrito (debe especificar id_taller o id_bloque)',
    example: '507f1f77bcf86cd799439013'
  })
  @IsMongoId()
  @IsOptional()
  id_bloque?: string;

  @ApiPropertyOptional({
    description: 'Cantidad de inscripciones',
    example: 1,
    minimum: 1,
    default: 1
  })
  @IsNumber()
  @Min(1)
  @IsOptional()
  cantidad?: number;

  @ApiProperty({
    description: 'Precio unitario del item',
    example: 150.00,
    minimum: 0,
    required: true
  })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  precio_unitario: number;

  @ApiProperty({
    description: 'Precio total (cantidad * precio_unitario)',
    example: 150.00,
    minimum: 0,
    required: true
  })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  precio_total: number;

  @ApiPropertyOptional({
    description: 'Identificador único del pago en el sistema de pagos externo',
    example: 'pay_abc123xyz789'
  })
  @IsString()
  @IsOptional()
  identificador_pago?: string;

  @ApiPropertyOptional({
    description: 'Observaciones adicionales del detalle de inscripción',
    example: 'Inscripción con descuento por promoción especial'
  })
  @IsString()
  @IsOptional()
  observaciones?: string;

  @ApiPropertyOptional({
    description: 'Estado del detalle de inscripción',
    example: 'pendiente',
    enum: ['pendiente', 'confirmado', 'cancelado'],
    default: 'pendiente'
  })
  @IsString()
  @IsIn(['pendiente', 'confirmado', 'cancelado'])
  @IsOptional()
  estado?: string;
}