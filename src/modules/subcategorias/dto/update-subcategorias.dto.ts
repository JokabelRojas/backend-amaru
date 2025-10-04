import { PartialType } from '@nestjs/mapped-types';
import { CreateSubcategoriaDto } from './create-subcategorias.dto';

export class UpdateSubcategoriaDto extends PartialType(CreateSubcategoriaDto) {}