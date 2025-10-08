import {Controller,Get, Post, Put, Delete, Body, Param, Query, HttpCode, HttpStatus, ParseDatePipe,} from '@nestjs/common';
import { CategoriaService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categorias.dto';
import { UpdateCategoriaDto } from './dto/update-categorias.dto';
import { Categoria } from 'src/entities/categoria.entity';
import {  ApiTags,  ApiOperation,  ApiResponse,  ApiBody,  ApiParam,  ApiQuery, ApiBadRequestResponse, ApiNotFoundResponse } from '@nestjs/swagger';

@ApiTags('categorias')
@Controller('categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Crear una nueva categoría', 
    description: 'Crea una nueva categoría en el sistema' 
  })
  @ApiBody({ type: CreateCategoriaDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Categoría creada exitosamente',
    type: Categoria 
  })
  @ApiBadRequestResponse({ 
    description: 'Datos de categoría inválidos o nombre duplicado' 
  })
  async create(@Body() createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    return this.categoriaService.create(createCategoriaDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Obtener todas las categorías', 
    description: 'Retorna lista de categorías con opciones de filtrado por estado y fecha' 
  })
  @ApiQuery({ 
    name: 'estado', 
    required: false,
    enum: ['activo', 'inactivo'],
    description: 'Filtrar por estado de la categoría'
  })
  @ApiQuery({ 
    name: 'startDate', 
    required: false,
    type: Date,
    description: 'Fecha de inicio para filtro por rango (YYYY-MM-DD)'
  })
  @ApiQuery({ 
    name: 'endDate', 
    required: false,
    type: Date,
    description: 'Fecha de fin para filtro por rango (YYYY-MM-DD)'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de categorías obtenida exitosamente',
    type: [Categoria] 
  })
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
  @ApiOperation({ 
    summary: 'Obtener categorías por tipo', 
    description: 'Retorna categorías filtradas por tipo específico' 
  })
  @ApiParam({ 
    name: 'tipo', 
    description: 'Tipo de categoría',
    example: 'productos',
    enum: ['productos', 'servicios', 'mixto']
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Categorías del tipo especificado',
    type: [Categoria] 
  })
  @ApiNotFoundResponse({ 
    description: 'No se encontraron categorías para el tipo especificado' 
  })
  async findByTipo(@Param('tipo') tipo: string): Promise<Categoria[]> {
    return this.categoriaService.findByTipo(tipo);
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Obtener una categoría por ID', 
    description: 'Retorna una categoría específica por su ID' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID de la categoría (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439011'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Categoría encontrada exitosamente',
    type: Categoria 
  })
  @ApiNotFoundResponse({ 
    description: 'Categoría no encontrada' 
  })
  async findOne(@Param('id') id: string): Promise<Categoria> {
    return this.categoriaService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ 
    summary: 'Actualizar una categoría', 
    description: 'Actualiza la información de una categoría específica' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID de la categoría a actualizar (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439011'
  })
  @ApiBody({ type: UpdateCategoriaDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Categoría actualizada exitosamente',
    type: Categoria 
  })
  @ApiNotFoundResponse({ 
    description: 'Categoría no encontrada' 
  })
  @ApiBadRequestResponse({ 
    description: 'Datos de actualización inválidos o nombre duplicado' 
  })
  async update(
    @Param('id') id: string,
    @Body() updateCategoriaDto: UpdateCategoriaDto,
  ): Promise<Categoria> {
    return this.categoriaService.update(id, updateCategoriaDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ 
    summary: 'Eliminar permanentemente una categoría', 
    description: 'Elimina permanentemente una categoría del sistema (operación irreversible)' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID de la categoría a eliminar (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439011'
  })
  @ApiResponse({ 
    status: 204, 
    description: 'Categoría eliminada permanentemente' 
  })
  @ApiNotFoundResponse({ 
    description: 'Categoría no encontrada' 
  })
  async remove(@Param('id') id: string): Promise<void> {
    await this.categoriaService.remove(id);
  }

  @Put(':id/desactivar')
  @ApiOperation({ 
    summary: 'Desactivar una categoría', 
    description: 'Desactiva una categoría (soft delete) cambiando su estado a inactivo' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID de la categoría a desactivar (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439011'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Categoría desactivada exitosamente',
    type: Categoria 
  })
  @ApiNotFoundResponse({ 
    description: 'Categoría no encontrada' 
  })
  async deactivate(@Param('id') id: string): Promise<Categoria> {
    return this.categoriaService.softDelete(id);
  }

  @Put(':id/activar')
  @ApiOperation({ 
    summary: 'Activar una categoría', 
    description: 'Activa una categoría previamente desactivada cambiando su estado a activo' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID de la categoría a activar (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439011'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Categoría activada exitosamente',
    type: Categoria 
  })
  @ApiNotFoundResponse({ 
    description: 'Categoría no encontrada' 
  })
  async activate(@Param('id') id: string): Promise<Categoria> {
    return this.categoriaService.activate(id);
  }
}