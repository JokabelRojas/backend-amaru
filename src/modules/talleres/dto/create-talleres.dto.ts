import { IsString, IsNotEmpty, IsOptional, IsMongoId, IsNumber, IsDateString, IsIn, Min, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTallerDto {
  @ApiProperty({
    description: 'Nombre del taller',
    example: 'Introducción a la Programación Web',
    required: true
  })
  @IsString()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  nombre: string;

  @ApiPropertyOptional({
    description: 'Descripción del taller',
    example: 'Aprende los fundamentos de HTML, CSS y JavaScript para crear sitios web modernos'
  })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiProperty({
    description: 'Fecha de inicio del taller (formato ISO 8601)',
    example: '2024-03-01T09:00:00.000Z',
    required: true
  })
  @IsDateString()
  @IsNotEmpty({ message: 'La fecha de inicio es requerida' })
  fecha_inicio: Date;

  @ApiProperty({
    description: 'Fecha de fin del taller (formato ISO 8601)',
    example: '2024-03-15T18:00:00.000Z',
    required: true
  })
  @IsDateString()
  @IsNotEmpty({ message: 'La fecha de fin es requerida' })
  fecha_fin: Date;

  @ApiProperty({
    description: 'Horario del taller',
    example: 'Lunes y Miércoles de 18:00 a 20:00',
    required: true
  })
  @IsString()
  @IsNotEmpty({ message: 'El horario es requerido' })
  horario: string;

  @ApiProperty({
    description: 'Modalidad del taller',
    example: 'virtual',
    enum: ['presencial', 'virtual', 'hibrido'],
    required: true
  })
  @IsString()
  @IsIn(['presencial', 'virtual', 'hibrido'], { message: 'La modalidad debe ser: presencial, virtual o hibrido' })
  @IsNotEmpty({ message: 'La modalidad es requerida' })
  modalidad: string;

  @ApiProperty({
    description: 'Duración del taller en horas',
    example: 20,
    minimum: 1,
    required: true
  })
  @IsNumber()
  @Min(1, { message: 'La duración debe ser al menos 1 hora' })
  @IsNotEmpty({ message: 'La duración es requerida' })
  duracion: number;

  @ApiProperty({
    description: 'Precio del taller',
    example: 150.00,
    minimum: 0,
    required: true
  })
  @IsNumber()
  @Min(0, { message: 'El precio no puede ser negativo' })
  @IsNotEmpty({ message: 'El precio es requerido' })
  precio: number;

  @ApiProperty({
    description: 'Cupo total de participantes',
    example: 30,
    minimum: 1,
    required: true
  })
  @IsNumber()
  @Min(1, { message: 'El cupo total debe ser al menos 1' })
  @IsNotEmpty({ message: 'El cupo total es requerido' })
  cupo_total: number;

    @ApiProperty({
    description: 'ID de la categoría a la que pertenece el taller',
    example: '507f1f77bcf86cd799439010',
    required: true
  })
  @IsMongoId({ message: 'El ID de categoría debe ser un ObjectId válido' })
  @IsNotEmpty({ message: 'El ID de categoría es requerido' })
  id_categoria: string;

  @ApiProperty({
    description: 'ID de la subcategoría a la que pertenece el taller',
    example: '507f1f77bcf86cd799439011',
    required: true
  })
  @IsMongoId()
  @IsNotEmpty({ message: 'El ID de subcategoría es requerido' })
  id_subcategoria: string;

  @ApiPropertyOptional({
    description: 'Estado del taller',
    example: 'activo',
    enum: ['activo', 'inactivo'],
    default: 'activo'
  })
  @IsString()
  @IsIn(['activo', 'inactivo'], { message: 'El estado debe ser activo o inactivo' })
  @IsOptional()
  estado?: string;

  @ApiPropertyOptional({
    description: 'URL de la imagen del taller',
    example: 'https://ejemplo.com/imagen-taller.jpg'
  })
  @IsString()
  @IsUrl()
  @IsOptional()
  imagen_url?: string;

}