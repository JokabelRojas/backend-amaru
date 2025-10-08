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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBadRequestResponse,
  ApiNotFoundResponse
} from '@nestjs/swagger';

@ApiTags('subcategorias')
@Controller('subcategorias')
export class SubcategoriasController {
  constructor(private readonly subcategoriasService: SubcategoriasService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear una nueva subcategoría',
    description: 'Crea una nueva subcategoría asociada a una categoría existente'
  })
  @ApiBody({ type: CreateSubcategoriaDto })
  @ApiResponse({
    status: 201,
    description: 'Subcategoría creada exitosamente',
    type: Subcategoria
  })
  @ApiBadRequestResponse({
    description: 'Datos inválidos o ID de categoría no existe'
  })
  async create(@Body() createSubcategoriaDto: CreateSubcategoriaDto): Promise<Subcategoria> {
    return this.subcategoriasService.create(createSubcategoriaDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todas las subcategorías',
    description: 'Retorna una lista de todas las subcategorías del sistema'
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de subcategorías obtenida exitosamente',
    type: [Subcategoria]
  })
  async findAll(): Promise<Subcategoria[]> {
    return this.subcategoriasService.findAll();
  }

  @Get('categoria/:idCategoria')
  @ApiOperation({
    summary: 'Obtener subcategorías por categoría',
    description: 'Retorna todas las subcategorías asociadas a una categoría específica'
  })
  @ApiParam({
    name: 'idCategoria',
    description: 'ID de la categoría (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439011'
  })
  @ApiResponse({
    status: 200,
    description: 'Subcategorías de la categoría especificada',
    type: [Subcategoria]
  })
  @ApiNotFoundResponse({
    description: 'Categoría no encontrada'
  })
  async findByCategoria(@Param('idCategoria') idCategoria: string): Promise<Subcategoria[]> {
    return this.subcategoriasService.findByCategoria(idCategoria);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener una subcategoría por ID',
    description: 'Retorna una subcategoría específica por su ID'
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la subcategoría (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439012'
  })
  @ApiResponse({
    status: 200,
    description: 'Subcategoría encontrada exitosamente',
    type: Subcategoria
  })
  @ApiNotFoundResponse({
    description: 'Subcategoría no encontrada'
  })
  async findOne(@Param('id') id: string): Promise<Subcategoria> {
    return this.subcategoriasService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar una subcategoría',
    description: 'Actualiza la información de una subcategoría específica'
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la subcategoría a actualizar (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439012'
  })
  @ApiBody({ type: UpdateSubcategoriaDto })
  @ApiResponse({
    status: 200,
    description: 'Subcategoría actualizada exitosamente',
    type: Subcategoria
  })
  @ApiNotFoundResponse({
    description: 'Subcategoría no encontrada'
  })
  @ApiBadRequestResponse({
    description: 'Datos de actualización inválidos'
  })
  async update(
    @Param('id') id: string,
    @Body() updateSubcategoriaDto: UpdateSubcategoriaDto
  ): Promise<Subcategoria> {
    return this.subcategoriasService.update(id, updateSubcategoriaDto);
  }

  @Patch(':id/estado')
  @ApiOperation({
    summary: 'Cambiar estado de una subcategoría',
    description: 'Cambia el estado (activo/inactivo) de una subcategoría específica'
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la subcategoría (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439012'
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        estado: {
          type: 'string',
          enum: ['activo', 'inactivo'],
          example: 'activo'
        }
      },
      required: ['estado']
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Estado de la subcategoría cambiado exitosamente',
    type: Subcategoria
  })
  @ApiNotFoundResponse({
    description: 'Subcategoría no encontrada'
  })
  @ApiBadRequestResponse({
    description: 'Estado inválido. Debe ser "activo" o "inactivo"'
  })
  async cambiarEstado(
    @Param('id') id: string,
    @Body('estado') estado: string
  ): Promise<Subcategoria> {
    return this.subcategoriasService.cambiarEstado(id, estado);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Eliminar una subcategoría',
    description: 'Elimina permanentemente una subcategoría del sistema'
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la subcategoría a eliminar (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439012'
  })
  @ApiResponse({
    status: 204,
    description: 'Subcategoría eliminada exitosamente'
  })
  @ApiNotFoundResponse({
    description: 'Subcategoría no encontrada'
  })
  async remove(@Param('id') id: string): Promise<void> {
    await this.subcategoriasService.remove(id);
  }
}