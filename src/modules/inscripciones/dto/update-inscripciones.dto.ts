import { PartialType } from '@nestjs/mapped-types';
import { CreateInscripcionDto } from './create-inscripciones.dto';

export class UpdateInscripcionDto extends PartialType(CreateInscripcionDto) {}