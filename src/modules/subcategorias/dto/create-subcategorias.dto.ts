import { IsString, IsNotEmpty, IsOptional, IsMongoId } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSubcategoriaDto {
  @ApiProperty({
    description: 'Nombre de la subcategoría',
    example: 'Smartphones',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiPropertyOptional({
    description: 'Descripción de la subcategoría',
    example: 'Teléfonos inteligentes y dispositivos móviles'
  })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiProperty({
    description: 'ID de la categoría padre (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439011',
    required: true
  })
  @IsMongoId()
  @IsNotEmpty()
  id_categoria: string;
}