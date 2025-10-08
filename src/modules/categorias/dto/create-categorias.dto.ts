import { IsString, IsIn, IsOptional, Length, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoriaDto {
  @ApiProperty({
    description: 'Nombre único de la categoría',
    example: 'Electrónicos',
    minLength: 1,
    maxLength: 50
  })
  @IsString()
  @Length(1, 50)
  nombre: string;

  @ApiProperty({
    description: 'Tipo de categoría',
    example: 'productos',
    enum: ['productos', 'servicios', 'mixto']
  })
  @IsString()
  tipo: string;

  @ApiPropertyOptional({
    description: 'Descripción de la categoría',
    example: 'Productos electrónicos y dispositivos tecnológicos',
    maxLength: 200
  })
  @IsOptional()
  @IsString()
  @Length(0, 200)
  descripcion?: string;

  @ApiPropertyOptional({
    description: 'Estado de la categoría',
    example: 'activo',
    enum: ['activo', 'inactivo'],
    default: 'activo'
  })
  @IsOptional()
  @IsString()
  @IsIn(['activo', 'inactivo'])
  estado?: string;

  @ApiPropertyOptional({
    description: 'Fecha de creación (se genera automáticamente si no se proporciona)',
    example: '2024-01-01T00:00:00.000Z'
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  createdAt?: Date;

  @ApiPropertyOptional({
    description: 'Fecha de actualización (se genera automáticamente si no se proporciona)',
    example: '2024-01-01T00:00:00.000Z'
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  updatedAt?: Date;
}