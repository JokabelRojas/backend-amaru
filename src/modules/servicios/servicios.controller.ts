import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ServiciosService } from './servicios.service';
import { CreateServicioDto } from './dto/create-servicios.dto';
import { UpdateServicioDto } from './dto/update-servicios.dto';
import { Servicio } from 'src/entities/servicio.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiQuery
} from '@nestjs/swagger';

@ApiTags('servicios')
@Controller('servicios')
export class ServiciosController {
  constructor(private readonly serviciosService: ServiciosService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo servicio',
    description: 'Crea un nuevo servicio asociado a una categoría y subcategoría existente'
  })
  @ApiBody({ type: CreateServicioDto })
  @ApiResponse({
    status: 201,
    description: 'Servicio creado exitosamente',
    type: Servicio
  })
  @ApiBadRequestResponse({
    description: 'Datos inválidos o IDs de categoría/subcategoría no existen'
  })
  create(@Body() createServicioDto: CreateServicioDto): Promise<Servicio> {
    return this.serviciosService.create(createServicioDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los servicios',
    description: 'Retorna una lista completa de todos los servicios del sistema'
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de servicios obtenida exitosamente',
    type: [Servicio]
  })
  findAll(): Promise<Servicio[]> {
    return this.serviciosService.findAll();
  }

  @Get('filtrar/servicios')
  @ApiOperation({
    summary: 'Filtrar servicios',
    description: 'Permite filtrar servicios por categoría, subcategoría y estado (todos opcionales)'
  })
  @ApiQuery({ 
    name: 'id_categoria', 
    required: false,
    description: 'ID de la categoría para filtrar',
    example: '507f1f77bcf86cd799439010'
  })
  @ApiQuery({ 
    name: 'id_subcategoria', 
    required: false,
    description: 'ID de la subcategoría para filtrar',
    example: '507f1f77bcf86cd799439011'
  })
  @ApiQuery({ 
    name: 'estado', 
    required: false,
    description: 'Estado del servicio (activo/inactivo)',
    enum: ['activo', 'inactivo'],
    example: 'activo'
  })
  @ApiResponse({
    status: 200,
    description: 'Servicios filtrados obtenidos exitosamente',
    type: [Servicio]
  })
  @ApiBadRequestResponse({
    description: 'Parámetros de filtrado inválidos'
  })
  async filtrarServicios(
    @Query('id_categoria') idCategoria?: string,
    @Query('id_subcategoria') idSubcategoria?: string,
    @Query('estado') estado?: string,
  ): Promise<Servicio[]> {
    return this.serviciosService.filtrarServicios({
      id_categoria: idCategoria,
      id_subcategoria: idSubcategoria,
      estado,
    });
  }

  @Get('categoria/:idCategoria')
  @ApiOperation({
    summary: 'Obtener servicios por categoría',
    description: 'Retorna todos los servicios asociados a una categoría específica'
  })
  @ApiParam({
    name: 'idCategoria',
    description: 'ID de la categoría (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439010'
  })
  @ApiResponse({
    status: 200,
    description: 'Servicios de la categoría especificada',
    type: [Servicio]
  })
  @ApiNotFoundResponse({
    description: 'Categoría no encontrada'
  })
  findByCategoria(@Param('idCategoria') idCategoria: string): Promise<Servicio[]> {
    return this.serviciosService.findByCategoria(idCategoria);
  }

  @Get('subcategoria/:idSubcategoria')
  @ApiOperation({
    summary: 'Obtener servicios por subcategoría',
    description: 'Retorna todos los servicios asociados a una subcategoría específica'
  })
  @ApiParam({
    name: 'idSubcategoria',
    description: 'ID de la subcategoría (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439011'
  })
  @ApiResponse({
    status: 200,
    description: 'Servicios de la subcategoría especificada',
    type: [Servicio]
  })
  @ApiNotFoundResponse({
    description: 'Subcategoría no encontrada'
  })
  findBySubcategoria(@Param('idSubcategoria') idSubcategoria: string): Promise<Servicio[]> {
    return this.serviciosService.findBySubcategoria(idSubcategoria);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un servicio por ID',
    description: 'Retorna un servicio específico por su ID con toda su información'
  })
  @ApiParam({
    name: 'id',
    description: 'ID del servicio (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439012'
  })
  @ApiResponse({
    status: 200,
    description: 'Servicio encontrado exitosamente',
    type: Servicio
  })
  @ApiNotFoundResponse({
    description: 'Servicio no encontrado'
  })
  findOne(@Param('id') id: string): Promise<Servicio> {
    return this.serviciosService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un servicio',
    description: 'Actualiza la información de un servicio específico'
  })
  @ApiParam({
    name: 'id',
    description: 'ID del servicio a actualizar (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439012'
  })
  @ApiBody({ type: UpdateServicioDto })
  @ApiResponse({
    status: 200,
    description: 'Servicio actualizado exitosamente',
    type: Servicio
  })
  @ApiNotFoundResponse({
    description: 'Servicio no encontrado'
  })
  @ApiBadRequestResponse({
    description: 'Datos de actualización inválidos'
  })
  update(@Param('id') id: string, @Body() updateServicioDto: UpdateServicioDto): Promise<Servicio> {
    return this.serviciosService.update(id, updateServicioDto);
  }

  @Patch(':id/estado')
  @ApiOperation({
    summary: 'Cambiar estado de un servicio',
    description: 'Activa o desactiva un servicio específico'
  })
  @ApiParam({
    name: 'id',
    description: 'ID del servicio (MongoDB ObjectId)',
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
          description: 'Nuevo estado del servicio'
        }
      },
      required: ['estado']
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Estado del servicio cambiado exitosamente',
    type: Servicio
  })
  @ApiNotFoundResponse({
    description: 'Servicio no encontrado'
  })
  @ApiBadRequestResponse({
    description: 'Estado inválido. Debe ser "activo" o "inactivo"'
  })
  cambiarEstado(@Param('id') id: string, @Body('estado') estado: string): Promise<Servicio> {
    return this.serviciosService.cambiarEstado(id, estado);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Eliminar un servicio',
    description: 'Elimina permanentemente un servicio del sistema (operación irreversible)'
  })
  @ApiParam({
    name: 'id',
    description: 'ID del servicio a eliminar (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439012'
  })
  @ApiResponse({
    status: 204,
    description: 'Servicio eliminado exitosamente'
  })
  @ApiNotFoundResponse({
    description: 'Servicio no encontrado'
  })
  async remove(@Param('id') id: string): Promise<void> {
    await this.serviciosService.remove(id);
  }
}