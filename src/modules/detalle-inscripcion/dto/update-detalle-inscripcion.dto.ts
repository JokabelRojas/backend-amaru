import { PartialType } from '@nestjs/mapped-types';
import { CreateDetalleInscripcionDto } from './create-detalle-inscripcion.dto';

export class UpdateDetalleInscripcionDto extends PartialType(CreateDetalleInscripcionDto) {}