import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuarios.dto';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {}