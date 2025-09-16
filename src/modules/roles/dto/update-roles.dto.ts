import { PartialType } from '@nestjs/mapped-types';
import { CreateRolDto } from './create-roles.dto';

export class UpdateRolDto extends PartialType(CreateRolDto) {}