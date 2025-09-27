import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoriaDto } from './create-categorias.dto';
import { IsOptional, IsString, IsIn, Length, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCategoriaDto extends PartialType(CreateCategoriaDto) {
 @IsOptional()
  @IsString()
  @Length(1, 50)
  nombre?: string;

  @IsOptional()
  @IsString()
  tipo?: string;

  @IsOptional()
  @IsString()
  @Length(0, 200)
  descripcion?: string;

  @IsOptional()
  @IsString()
  @IsIn(['activo', 'inactivo'])
  estado?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  updatedAt?: Date;
}