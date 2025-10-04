import { PartialType } from '@nestjs/mapped-types';
import { CreateTallerDto } from './create-talleres.dto';

export class UpdateTallerDto extends PartialType(CreateTallerDto) {}