import { PartialType } from '@nestjs/mapped-types';
import { CreateBloqueDto } from './create-bloques.dto';

export class UpdateBloqueDto extends PartialType(CreateBloqueDto) {}