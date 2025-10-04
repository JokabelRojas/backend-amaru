import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  HttpCode,
  HttpStatus,
  Query 
} from '@nestjs/common';
import { TalleresService } from './talleres.service';
import { CreateTallerDto } from './dto/create-talleres.dto';
import { UpdateTallerDto } from './dto/update-talleres.dto';
import { Taller } from 'src/entities/taller.entity';

@Controller('talleres')
export class TalleresController {
  constructor(private readonly talleresService: TalleresService) {}

  @Post()
  async create(@Body() createTallerDto: CreateTallerDto): Promise<Taller> {
    return this.talleresService.create(createTallerDto);
  }

  @Get()
  async findAll(): Promise<Taller[]> {
    return this.talleresService.findAll();
  }

  @Get('activos')
  async findActivos(): Promise<Taller[]> {
    return this.talleresService.findActivos();
  }

  @Get('proximos')
  async findProximos(): Promise<Taller[]> {
    return this.talleresService.findProximos();
  }

  @Get('subcategoria/:idSubcategoria')
  async findBySubcategoria(@Param('idSubcategoria') idSubcategoria: string): Promise<Taller[]> {
    return this.talleresService.findBySubcategoria(idSubcategoria);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Taller> {
    return this.talleresService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateTallerDto: UpdateTallerDto
  ): Promise<Taller> {
    return this.talleresService.update(id, updateTallerDto);
  }

  @Patch(':id/estado')
  async cambiarEstado(
    @Param('id') id: string,
    @Body('estado') estado: string
  ): Promise<Taller> {
    return this.talleresService.cambiarEstado(id, estado);
  }

  @Patch(':id/cupo')
  async actualizarCupo(
    @Param('id') id: string,
    @Body('cupos_reservados') cuposReservados: number
  ): Promise<Taller> {
    return this.talleresService.actualizarCupo(id, cuposReservados);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.talleresService.remove(id);
  }
}