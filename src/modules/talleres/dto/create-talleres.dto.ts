import { IsString, IsNotEmpty, IsOptional, IsMongoId, IsNumber, IsDateString, IsIn, Min, IsUrl } from 'class-validator';

export class CreateTallerDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsDateString()
  @IsNotEmpty({ message: 'La fecha de inicio es requerida' })
  fecha_inicio: Date;

  @IsDateString()
  @IsNotEmpty({ message: 'La fecha de fin es requerida' })
  fecha_fin: Date;

  @IsString()
  @IsNotEmpty({ message: 'El horario es requerido' })
  horario: string;

  @IsString()
  @IsIn(['presencial', 'virtual', 'hibrido'], { message: 'La modalidad debe ser: presencial, virtual o hibrido' })
  @IsNotEmpty({ message: 'La modalidad es requerida' })
  modalidad: string;

  @IsNumber()
  @Min(1, { message: 'La duración debe ser al menos 1 hora' })
  @IsNotEmpty({ message: 'La duración es requerida' })
  duracion: number;

  @IsNumber()
  @Min(0, { message: 'El precio no puede ser negativo' })
  @IsNotEmpty({ message: 'El precio es requerido' })
  precio: number;

  @IsNumber()
  @Min(1, { message: 'El cupo total debe ser al menos 1' })
  @IsNotEmpty({ message: 'El cupo total es requerido' })
  cupo_total: number;

  @IsMongoId()
  @IsNotEmpty({ message: 'El ID de subcategoría es requerido' })
  id_subcategoria: string;

  @IsString()
  @IsIn(['activo', 'inactivo'], { message: 'El estado debe ser activo o inactivo' })
  @IsOptional()
  estado?: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  imagen_url?: string;
}