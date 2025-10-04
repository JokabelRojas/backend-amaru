import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { BloquesService } from './bloques.service';
import { CreateBloqueDto } from './dto/create-bloques.dto';
import { UpdateBloqueDto } from './dto/update-bloques.dto';
import { Bloque } from 'src/entities/bloque.entity';

@Controller('bloques')
export class BloquesController {
  constructor(private readonly bloquesService: BloquesService) {}

  @Post()
  create(@Body() createBloqueDto: CreateBloqueDto): Promise<Bloque> {
    return this.bloquesService.create(createBloqueDto);
  }

  @Get()
  findAll(): Promise<Bloque[]> {
    return this.bloquesService.findAll();
  }

  @Get('taller/:idTaller')
  findByTaller(@Param('idTaller') idTaller: string): Promise<Bloque[]> {
    return this.bloquesService.findByTaller(idTaller);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Bloque> {
    return this.bloquesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBloqueDto: UpdateBloqueDto): Promise<Bloque> {
    return this.bloquesService.update(id, updateBloqueDto);
  }

  @Patch(':id/estado')
  cambiarEstado(@Param('id') id: string, @Body('estado') estado: string): Promise<Bloque> {
    return this.bloquesService.cambiarEstado(id, estado);
  }

  @Patch(':id/cupo')
  actualizarCupo(@Param('id') id: string, @Body('cupos_reservados') cuposReservados: number): Promise<Bloque> {
    return this.bloquesService.actualizarCupo(id, cuposReservados);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.bloquesService.remove(id);
  }
}