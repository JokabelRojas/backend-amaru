import { PartialType } from '@nestjs/mapped-types';
import { CreateFestivalDto } from './create-festivales.dto';

export class UpdateFestivalDto extends PartialType(CreateFestivalDto) {}