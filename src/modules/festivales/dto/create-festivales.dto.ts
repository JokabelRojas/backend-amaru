import { IsString, IsNotEmpty, IsOptional, IsMongoId, IsDateString, IsIn, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFestivalDto {
  @ApiProperty({
    description: 'Título del festival',
    example: 'Festival de Música Electrónica 2024',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiPropertyOptional({
    description: 'Descripción detallada del festival',
    example: 'El evento más esperado del año con los mejores DJs internacionales y producciones audiovisuales de vanguardia'
  })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiProperty({
    description: 'Fecha del evento del festival (formato ISO 8601)',
    example: '2024-07-15T20:00:00.000Z',
    required: true
  })
  @IsDateString()
  @IsNotEmpty()
  fecha_evento: Date;

  @ApiProperty({
    description: 'Lugar donde se realizará el festival',
    example: 'Estadio Nacional, Lima',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  lugar: string;

  @ApiProperty({
    description: 'Organizador del festival',
    example: 'Empresa de Eventos S.A.',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  organizador: string;

  @ApiProperty({
    description: 'Tipo de festival',
    example: 'musical',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  tipo: string;

  @ApiProperty({
    description: 'ID de la categoría a la que pertenece el festival',
    example: '507f1f77bcf86cd799439011',
    required: true
  })
  @IsMongoId()
  @IsNotEmpty()
  id_categoria: string;

  @ApiPropertyOptional({
    description: 'Estado del festival',
    example: 'activo',
    enum: ['activo', 'inactivo'],
    default: 'activo'
  })
  @IsString()
  @IsIn(['activo', 'inactivo'])
  @IsOptional()
  estado?: string;

  @ApiPropertyOptional({
    description: 'URL de la imagen del festival',
    example: 'https://ejemplo.com/imagen-festival.jpg'
  })
  @IsString()
  @IsUrl()
  @IsOptional()
  imagen_url?: string;
}