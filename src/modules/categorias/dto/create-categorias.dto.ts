import { IsString, IsIn, IsOptional, Length, IsDate } from 'class-validator';
import { Type } from 'class-transformer';


export class CreateCategoriaDto {
@IsString()
  @Length(1, 50)
  nombre: string;

  @IsString()
  tipo: string;

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