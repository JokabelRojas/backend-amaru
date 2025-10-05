import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { DetalleInscripcionesService } from './detalle-inscripciones.service';
import { CreateDetalleInscripcionDto } from './dto/create-detalle-inscripcion.dto';
import { UpdateDetalleInscripcionDto } from './dto/update-detalle-inscripcion.dto';
import { DetalleInscripcion } from 'src/entities/detalle-inscripcion.entity';

@Controller('detalle-inscripciones')
export class DetalleInscripcionesController {
  constructor(private readonly detalleInscripcionesService: DetalleInscripcionesService) {}

  @Post()
  create(@Body() createDetalleInscripcionDto: CreateDetalleInscripcionDto): Promise<DetalleInscripcion> {
    return this.detalleInscripcionesService.create(createDetalleInscripcionDto);
  }

  @Get()
  findAll(): Promise<DetalleInscripcion[]> {
    return this.detalleInscripcionesService.findAll();
  }

  @Get('inscripcion/:idInscripcion')
  findByInscripcion(@Param('idInscripcion') idInscripcion: string): Promise<DetalleInscripcion[]> {
    return this.detalleInscripcionesService.findByInscripcion(idInscripcion);
  }

  @Get('taller/:idTaller')
  findByTaller(@Param('idTaller') idTaller: string): Promise<DetalleInscripcion[]> {
    return this.detalleInscripcionesService.findByTaller(idTaller);
  }

  @Get('bloque/:idBloque')
  findByBloque(@Param('idBloque') idBloque: string): Promise<DetalleInscripcion[]> {
    return this.detalleInscripcionesService.findByBloque(idBloque);
  }

  @Get('estadisticas/taller/:idTaller')
  getEstadisticasByTaller(@Param('idTaller') idTaller: string) {
    return this.detalleInscripcionesService.getEstadisticasByTaller(idTaller);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<DetalleInscripcion> {
    return this.detalleInscripcionesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetalleInscripcionDto: UpdateDetalleInscripcionDto): Promise<DetalleInscripcion> {
    return this.detalleInscripcionesService.update(id, updateDetalleInscripcionDto);
  }

  @Patch(':id/estado')
  cambiarEstado(@Param('id') id: string, @Body('estado') estado: string): Promise<DetalleInscripcion> {
    return this.detalleInscripcionesService.cambiarEstado(id, estado);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.detalleInscripcionesService.remove(id);
  }
}