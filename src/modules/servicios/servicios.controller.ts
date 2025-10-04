import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ServiciosService } from './servicios.service';
import { CreateServicioDto } from './dto/create-servicios.dto';
import { UpdateServicioDto } from './dto/update-servicios.dto';
import { Servicio } from 'src/entities/servicio.entity';

@Controller('servicios')
export class ServiciosController {
  constructor(private readonly serviciosService: ServiciosService) {}

  @Post()
  create(@Body() createServicioDto: CreateServicioDto): Promise<Servicio> {
    return this.serviciosService.create(createServicioDto);
  }

  @Get()
  findAll(): Promise<Servicio[]> {
    return this.serviciosService.findAll();
  }

  @Get('subcategoria/:idSubcategoria')
  findBySubcategoria(@Param('idSubcategoria') idSubcategoria: string): Promise<Servicio[]> {
    return this.serviciosService.findBySubcategoria(idSubcategoria);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Servicio> {
    return this.serviciosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServicioDto: UpdateServicioDto): Promise<Servicio> {
    return this.serviciosService.update(id, updateServicioDto);
  }

  @Patch(':id/estado')
  cambiarEstado(@Param('id') id: string, @Body('estado') estado: string): Promise<Servicio> {
    return this.serviciosService.cambiarEstado(id, estado);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.serviciosService.remove(id);
  }
}