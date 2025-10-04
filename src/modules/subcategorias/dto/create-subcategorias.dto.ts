import { IsString, IsNotEmpty, IsOptional, IsMongoId } from 'class-validator';

export class CreateSubcategoriaDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsMongoId()
  @IsNotEmpty()
  id_categoria: string;
}