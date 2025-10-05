import { PartialType } from '@nestjs/mapped-types';
import { CreatePagoDto } from './create-pagos.dto';

export class UpdatePagoDto extends PartialType(CreatePagoDto) {}