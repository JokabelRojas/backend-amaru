import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { FestivalesService } from './festivales.service';
import { CreateFestivalDto } from './dto/create-festivales.dto';
import { UpdateFestivalDto } from './dto/update-festivales.dto';
import { Festival } from 'src/entities/festival-premio.entity';

@Controller('festivales')
export class FestivalesController {
  constructor(private readonly festivalesService: FestivalesService) {}

  @Post()
  create(@Body() createFestivalDto: CreateFestivalDto): Promise<Festival> {
    return this.festivalesService.create(createFestivalDto);
  }

  @Get()
  findAll(): Promise<Festival[]> {
    return this.festivalesService.findAll();
  }

  @Get('proximos')
  findProximos(): Promise<Festival[]> {
    return this.festivalesService.findProximos();
  }

  @Get('categoria/:idCategoria')
  findByCategoria(@Param('idCategoria') idCategoria: string): Promise<Festival[]> {
    return this.festivalesService.findByCategoria(idCategoria);
  }

  @Get('tipo/:tipo')
  findByTipo(@Param('tipo') tipo: string): Promise<Festival[]> {
    return this.festivalesService.findByTipo(tipo);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Festival> {
    return this.festivalesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFestivalDto: UpdateFestivalDto): Promise<Festival> {
    return this.festivalesService.update(id, updateFestivalDto);
  }

  @Patch(':id/estado')
  cambiarEstado(@Param('id') id: string, @Body('estado') estado: string): Promise<Festival> {
    return this.festivalesService.cambiarEstado(id, estado);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.festivalesService.remove(id);
  }
}