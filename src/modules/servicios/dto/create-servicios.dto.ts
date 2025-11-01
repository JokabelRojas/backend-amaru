import { IsString, IsNotEmpty, IsOptional, IsMongoId, IsIn, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateServicioDto {
  @ApiProperty({
    description: 'Título del servicio',
    example: 'Desarrollo de Aplicaciones Web',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiPropertyOptional({
    description: 'Descripción detallada del servicio',
    example: 'Desarrollo de aplicaciones web modernas utilizando React, Node.js y MongoDB'
  })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiProperty({
    description: 'ID de la categoría a la que pertenece el servicio',
    example: '507f1f77bcf86cd799439010',
    required: true
  })
  @IsMongoId()
  @IsNotEmpty()
  id_categoria: string;

  @ApiProperty({
    description: 'ID de la subcategoría a la que pertenece el servicio',
    example: '507f1f77bcf86cd799439011',
    required: true
  })
  @IsMongoId()
  @IsNotEmpty()
  id_subcategoria: string;

  @ApiPropertyOptional({
    description: 'Estado del servicio',
    example: 'activo',
    enum: ['activo', 'inactivo'],
    default: 'activo'
  })
  @IsString()
  @IsIn(['activo', 'inactivo'])
  @IsOptional()
  estado?: string;

  @ApiPropertyOptional({
    description: 'URL de la imagen del servicio',
    example: 'https://ejemplo.com/imagen-servicio.jpg'
  })
  @IsString()
  @IsUrl()
  @IsOptional()
  imagen_url?: string;
}