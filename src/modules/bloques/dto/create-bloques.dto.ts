import { IsString, IsNotEmpty, IsOptional, IsMongoId, IsNumber, IsDateString, IsIn, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBloqueDto {
  @ApiProperty({
    description: 'Nombre del bloque',
    example: 'Bloque 1: Fundamentos de HTML',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiPropertyOptional({
    description: 'Descripción del bloque',
    example: 'En este bloque aprenderás las etiquetas básicas de HTML5 y estructura semántica'
  })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiProperty({
    description: 'Fecha de inicio del bloque (formato ISO 8601)',
    example: '2024-03-01T09:00:00.000Z',
    required: true
  })
  @IsDateString()
  @IsNotEmpty()
  fecha_inicio: Date;

  @ApiProperty({
    description: 'Fecha de fin del bloque (formato ISO 8601)',
    example: '2024-03-08T18:00:00.000Z',
    required: true
  })
  @IsDateString()
  @IsNotEmpty()
  fecha_fin: Date;

  @ApiProperty({
    description: 'Horario del bloque',
    example: 'Lunes de 18:00 a 20:00',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  horario: string;

  @ApiProperty({
    description: 'ID del taller al que pertenece el bloque',
    example: '507f1f77bcf86cd799439011',
    required: true
  })
  @IsMongoId()
  @IsNotEmpty()
  id_taller: string;

  @ApiProperty({
    description: 'Cupo total del bloque',
    example: 25,
    minimum: 1,
    required: true
  })
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  cupo_total: number;

  @ApiPropertyOptional({
    description: 'Estado del bloque',
    example: 'activo',
    enum: ['activo', 'inactivo'],
    default: 'activo'
  })
  @IsString()
  @IsIn(['activo', 'inactivo'])
  @IsOptional()
  estado?: string;
}