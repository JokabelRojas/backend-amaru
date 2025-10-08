import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsIn, Min, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateInscripcionDto {
  @ApiProperty({
    description: 'ID del usuario que realiza la inscripción',
    example: '507f1f77bcf86cd799439011',
    required: true
  })
  @IsMongoId()
  @IsNotEmpty()
  id_usuario: string;

  @ApiProperty({
    description: 'Total a pagar por la inscripción',
    example: 150.00,
    minimum: 0,
    required: true
  })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  total: number;

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

  @ApiPropertyOptional({
    description: 'Estado de la inscripción',
    example: 'pendiente',
    enum: ['pendiente', 'pagado', 'cancelado', 'completado'],
    default: 'pendiente'
  })
  @IsString()
  @IsIn(['pendiente', 'pagado', 'cancelado', 'completado'])
  @IsOptional()
  estado?: string;
}