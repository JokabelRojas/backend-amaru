import { PartialType } from '@nestjs/mapped-types';
import { CreateServicioDto } from './create-servicios.dto';

export class UpdateServicioDto extends PartialType(CreateServicioDto) {}