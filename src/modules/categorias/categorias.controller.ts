import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  ParseDatePipe,
} from '@nestjs/common';
import { CategoriaService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categorias.dto';
import { UpdateCategoriaDto } from './dto/update-categorias.dto';
import { Categoria } from 'src/entities/categoria.entity';

@Controller('categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  async create(@Body() createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    return this.categoriaService.create(createCategoriaDto);
  }

  @Get()
  async findAll(
    @Query('estado') estado?: string,
    @Query('startDate') startDate?: Date,
    @Query('endDate') endDate?: Date,
  ): Promise<Categoria[]> {
    if (startDate && endDate) {
      return this.categoriaService.findByDateRange(startDate, endDate);
    }
    
    if (estado === 'activo') {
      return this.categoriaService.findActive();
    }
    
    return this.categoriaService.findAll();
  }

  @Get('tipo/:tipo')
  async findByTipo(@Param('tipo') tipo: string): Promise<Categoria[]> {
    return this.categoriaService.findByTipo(tipo);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Categoria> {
    return this.categoriaService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoriaDto: UpdateCategoriaDto,
  ): Promise<Categoria> {
    return this.categoriaService.update(id, updateCategoriaDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.categoriaService.remove(id);
  }

  @Put(':id/desactivar')
  async deactivate(@Param('id') id: string): Promise<Categoria> {
    return this.categoriaService.softDelete(id);
  }

  @Put(':id/activar')
  async activate(@Param('id') id: string): Promise<Categoria> {
    return this.categoriaService.activate(id);
  }
}