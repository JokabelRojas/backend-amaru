import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { CreatePagoDto } from './dto/create-pagos.dto';
import { UpdatePagoDto } from './dto/update-pagos.dto';
import { Pago } from 'src/entities/pago.entity';

@Controller('pagos')
export class PagosController {
  constructor(private readonly pagosService: PagosService) {}

  @Post()
  create(@Body() createPagoDto: CreatePagoDto): Promise<Pago> {
    return this.pagosService.create(createPagoDto);
  }

  @Get()
  findAll(): Promise<Pago[]> {
    return this.pagosService.findAll();
  }

  @Get('estadisticas')
  getEstadisticas() {
    return this.pagosService.getEstadisticas();
  }

  @Get('usuario/:idUsuario')
  findByUsuario(@Param('idUsuario') idUsuario: string): Promise<Pago[]> {
    return this.pagosService.findByUsuario(idUsuario);
  }

  @Get('detalle/:idDetalle')
  findByDetalle(@Param('idDetalle') idDetalle: string): Promise<Pago[]> {
    return this.pagosService.findByDetalle(idDetalle);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Pago> {
    return this.pagosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePagoDto: UpdatePagoDto): Promise<Pago> {
    return this.pagosService.update(id, updatePagoDto);
  }

  @Patch(':id/estado')
  cambiarEstado(@Param('id') id: string, @Body('estado') estado: string): Promise<Pago> {
    return this.pagosService.cambiarEstado(id, estado);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.pagosService.remove(id);
  }
}