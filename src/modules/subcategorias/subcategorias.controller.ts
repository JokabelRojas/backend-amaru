import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  HttpCode,
  HttpStatus 
} from '@nestjs/common';
import { SubcategoriasService } from './subcategorias.service';
import { CreateSubcategoriaDto } from './dto/create-subcategorias.dto';
import { UpdateSubcategoriaDto } from './dto/update-subcategorias.dto';
import { Subcategoria } from 'src/entities/subcategoria.entity';

@Controller('subcategorias')
export class SubcategoriasController {
  constructor(private readonly subcategoriasService: SubcategoriasService) {}

  @Post()
  async create(@Body() createSubcategoriaDto: CreateSubcategoriaDto): Promise<Subcategoria> {
    return this.subcategoriasService.create(createSubcategoriaDto);
  }

  @Get()
  async findAll(): Promise<Subcategoria []> {
    return this.subcategoriasService.findAll();
  }

  @Get('categoria/:idCategoria')
  async findByCategoria(@Param('idCategoria') idCategoria: string): Promise<Subcategoria[]> {
    return this.subcategoriasService.findByCategoria(idCategoria);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Subcategoria> {
    return this.subcategoriasService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateSubcategoriaDto: UpdateSubcategoriaDto
  ): Promise<Subcategoria> {
    return this.subcategoriasService.update(id, updateSubcategoriaDto);
  }

  @Patch(':id/estado')
  async cambiarEstado(
    @Param('id') id: string,
    @Body('estado') estado: string
  ): Promise<Subcategoria> {
    return this.subcategoriasService.cambiarEstado(id, estado);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.subcategoriasService.remove(id);
  }
}