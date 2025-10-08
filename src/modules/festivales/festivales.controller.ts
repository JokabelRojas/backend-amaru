import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { FestivalesService } from './festivales.service';
import { CreateFestivalDto } from './dto/create-festivales.dto';
import { UpdateFestivalDto } from './dto/update-festivales.dto';
import { Festival } from 'src/entities/festival-premio.entity';
import {ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiBadRequestResponse, ApiNotFoundResponse} from '@nestjs/swagger';

@ApiTags('festivales')
@Controller('festivales')
export class FestivalesController {
  constructor(private readonly festivalesService: FestivalesService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo festival',
    description: 'Crea un nuevo festival o evento cultural en el sistema'
  })
  @ApiBody({ type: CreateFestivalDto })
  @ApiResponse({
    status: 201,
    description: 'Festival creado exitosamente',
    type: Festival
  })
  @ApiBadRequestResponse({
    description: 'Datos inválidos o ID de categoría no existe'
  })
  create(@Body() createFestivalDto: CreateFestivalDto): Promise<Festival> {
    return this.festivalesService.create(createFestivalDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los festivales',
    description: 'Retorna una lista completa de todos los festivales del sistema'
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de festivales obtenida exitosamente',
    type: [Festival]
  })
  findAll(): Promise<Festival[]> {
    return this.festivalesService.findAll();
  }

  @Get('proximos')
  @ApiOperation({
    summary: 'Obtener próximos festivales',
    description: 'Retorna los festivales que están por realizarse (fecha futura)'
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de próximos festivales obtenida exitosamente',
    type: [Festival]
  })
  findProximos(): Promise<Festival[]> {
    return this.festivalesService.findProximos();
  }

  @Get('categoria/:idCategoria')
  @ApiOperation({
    summary: 'Obtener festivales por categoría',
    description: 'Retorna todos los festivales asociados a una categoría específica'
  })
  @ApiParam({
    name: 'idCategoria',
    description: 'ID de la categoría (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439011'
  })
  @ApiResponse({
    status: 200,
    description: 'Festivales de la categoría especificada',
    type: [Festival]
  })
  @ApiNotFoundResponse({
    description: 'Categoría no encontrada'
  })
  findByCategoria(@Param('idCategoria') idCategoria: string): Promise<Festival[]> {
    return this.festivalesService.findByCategoria(idCategoria);
  }

  @Get('tipo/:tipo')
  @ApiOperation({
    summary: 'Obtener festivales por tipo',
    description: 'Retorna todos los festivales de un tipo específico (musical, cine, gastronómico, etc.)'
  })
  @ApiParam({
    name: 'tipo',
    description: 'Tipo de festival',
    example: 'musical',
    enum: ['musical', 'cine', 'gastronomico', 'cultural', 'arte', 'teatro', 'danza']
  })
  @ApiResponse({
    status: 200,
    description: 'Festivales del tipo especificado',
    type: [Festival]
  })
  @ApiNotFoundResponse({
    description: 'No se encontraron festivales para el tipo especificado'
  })
  findByTipo(@Param('tipo') tipo: string): Promise<Festival[]> {
    return this.festivalesService.findByTipo(tipo);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un festival por ID',
    description: 'Retorna un festival específico por su ID con toda su información'
  })
  @ApiParam({
    name: 'id',
    description: 'ID del festival (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439012'
  })
  @ApiResponse({
    status: 200,
    description: 'Festival encontrado exitosamente',
    type: Festival
  })
  @ApiNotFoundResponse({
    description: 'Festival no encontrado'
  })
  findOne(@Param('id') id: string): Promise<Festival> {
    return this.festivalesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un festival',
    description: 'Actualiza la información de un festival específico'
  })
  @ApiParam({
    name: 'id',
    description: 'ID del festival a actualizar (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439012'
  })
  @ApiBody({ type: UpdateFestivalDto })
  @ApiResponse({
    status: 200,
    description: 'Festival actualizado exitosamente',
    type: Festival
  })
  @ApiNotFoundResponse({
    description: 'Festival no encontrado'
  })
  @ApiBadRequestResponse({
    description: 'Datos de actualización inválidos'
  })
  update(@Param('id') id: string, @Body() updateFestivalDto: UpdateFestivalDto): Promise<Festival> {
    return this.festivalesService.update(id, updateFestivalDto);
  }

  @Patch(':id/estado')
  @ApiOperation({
    summary: 'Cambiar estado de un festival',
    description: 'Activa o desactiva un festival específico'
  })
  @ApiParam({
    name: 'id',
    description: 'ID del festival (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439012'
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        estado: {
          type: 'string',
          enum: ['activo', 'inactivo'],
          example: 'activo',
          description: 'Nuevo estado del festival'
        }
      },
      required: ['estado']
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Estado del festival cambiado exitosamente',
    type: Festival
  })
  @ApiNotFoundResponse({
    description: 'Festival no encontrado'
  })
  @ApiBadRequestResponse({
    description: 'Estado inválido. Debe ser "activo" o "inactivo"'
  })
  cambiarEstado(@Param('id') id: string, @Body('estado') estado: string): Promise<Festival> {
    return this.festivalesService.cambiarEstado(id, estado);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Eliminar un festival',
    description: 'Elimina permanentemente un festival del sistema (operación irreversible)'
  })
  @ApiParam({
    name: 'id',
    description: 'ID del festival a eliminar (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439012'
  })
  @ApiResponse({
    status: 204,
    description: 'Festival eliminado exitosamente'
  })
  @ApiNotFoundResponse({
    description: 'Festival no encontrado'
  })
  async remove(@Param('id') id: string): Promise<void> {
    await this.festivalesService.remove(id);
  }
}