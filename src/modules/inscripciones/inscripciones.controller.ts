import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { InscripcionesService } from './inscripciones.service';
import { CreateInscripcionDto } from './dto/create-inscripciones.dto';
import { UpdateInscripcionDto } from './dto/update-inscripciones.dto';
import { Inscripcion } from 'src/entities/inscripcion.entity';

@Controller('inscripciones')
export class InscripcionesController {
  constructor(private readonly inscripcionesService: InscripcionesService) {}

  @Post()
  create(@Body() createInscripcionDto: CreateInscripcionDto): Promise<Inscripcion> {
    return this.inscripcionesService.create(createInscripcionDto);
  }

  @Get()
  findAll(): Promise<Inscripcion[]> {
    return this.inscripcionesService.findAll();
  }

  @Get('estadisticas')
  getEstadisticas() {
    return this.inscripcionesService.getEstadisticas();
  }

  @Get('usuario/:idUsuario')
  findByUsuario(@Param('idUsuario') idUsuario: string): Promise<Inscripcion[]> {
    return this.inscripcionesService.findByUsuario(idUsuario);
  }

  @Get('estado/:estado')
  findByEstado(@Param('estado') estado: string): Promise<Inscripcion[]> {
    return this.inscripcionesService.findByEstado(estado);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Inscripcion> {
    return this.inscripcionesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInscripcionDto: UpdateInscripcionDto): Promise<Inscripcion> {
    return this.inscripcionesService.update(id, updateInscripcionDto);
  }

  @Patch(':id/estado')
  cambiarEstado(@Param('id') id: string, @Body('estado') estado: string): Promise<Inscripcion> {
    return this.inscripcionesService.cambiarEstado(id, estado);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.inscripcionesService.remove(id);
  }
}