import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { DetalleInscripcionesService } from './detalle-inscripciones.service';
import { CreateDetalleInscripcionDto } from './dto/create-detalle-inscripcion.dto';
import { UpdateDetalleInscripcionDto } from './dto/update-detalle-inscripcion.dto';
import { DetalleInscripcion } from 'src/entities/detalle-inscripcion.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBadRequestResponse,
  ApiNotFoundResponse
} from '@nestjs/swagger';

@ApiTags('detalle-inscripciones')
@Controller('detalle-inscripciones')
export class DetalleInscripcionesController {
  constructor(private readonly detalleInscripcionesService: DetalleInscripcionesService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo detalle de inscripción',
    description: 'Crea un nuevo detalle de inscripción para un taller o bloque específico'
  })
  @ApiBody({ type: CreateDetalleInscripcionDto })
  @ApiResponse({
    status: 201,
    description: 'Detalle de inscripción creado exitosamente',
    type: DetalleInscripcion
  })
  @ApiBadRequestResponse({
    description: 'Datos inválidos, debe especificar id_taller o id_bloque, o IDs no existen'
  })
  create(@Body() createDetalleInscripcionDto: CreateDetalleInscripcionDto): Promise<DetalleInscripcion> {
    return this.detalleInscripcionesService.create(createDetalleInscripcionDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los detalles de inscripción',
    description: 'Retorna una lista completa de todos los detalles de inscripción del sistema'
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de detalles de inscripción obtenida exitosamente',
    type: [DetalleInscripcion]
  })
  findAll(): Promise<DetalleInscripcion[]> {
    return this.detalleInscripcionesService.findAll();
  }

  @Get('inscripcion/:idInscripcion')
  @ApiOperation({
    summary: 'Obtener detalles por inscripción',
    description: 'Retorna todos los detalles de una inscripción específica'
  })
  @ApiParam({
    name: 'idInscripcion',
    description: 'ID de la inscripción (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439011'
  })
  @ApiResponse({
    status: 200,
    description: 'Detalles de la inscripción especificada',
    type: [DetalleInscripcion]
  })
  @ApiNotFoundResponse({
    description: 'Inscripción no encontrada'
  })
  findByInscripcion(@Param('idInscripcion') idInscripcion: string): Promise<DetalleInscripcion[]> {
    return this.detalleInscripcionesService.findByInscripcion(idInscripcion);
  }

  @Get('taller/:idTaller')
  @ApiOperation({
    summary: 'Obtener detalles por taller',
    description: 'Retorna todos los detalles de inscripción asociados a un taller específico'
  })
  @ApiParam({
    name: 'idTaller',
    description: 'ID del taller (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439012'
  })
  @ApiResponse({
    status: 200,
    description: 'Detalles de inscripción del taller especificado',
    type: [DetalleInscripcion]
  })
  @ApiNotFoundResponse({
    description: 'Taller no encontrado'
  })
  findByTaller(@Param('idTaller') idTaller: string): Promise<DetalleInscripcion[]> {
    return this.detalleInscripcionesService.findByTaller(idTaller);
  }

  @Get('bloque/:idBloque')
  @ApiOperation({
    summary: 'Obtener detalles por bloque',
    description: 'Retorna todos los detalles de inscripción asociados a un bloque específico'
  })
  @ApiParam({
    name: 'idBloque',
    description: 'ID del bloque (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439013'
  })
  @ApiResponse({
    status: 200,
    description: 'Detalles de inscripción del bloque especificado',
    type: [DetalleInscripcion]
  })
  @ApiNotFoundResponse({
    description: 'Bloque no encontrado'
  })
  findByBloque(@Param('idBloque') idBloque: string): Promise<DetalleInscripcion[]> {
    return this.detalleInscripcionesService.findByBloque(idBloque);
  }

  @Get('estadisticas/taller/:idTaller')
  @ApiOperation({
    summary: 'Obtener estadísticas por taller',
    description: 'Retorna estadísticas y métricas de inscripciones para un taller específico'
  })
  @ApiParam({
    name: 'idTaller',
    description: 'ID del taller (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439012'
  })
  @ApiResponse({
    status: 200,
    description: 'Estadísticas del taller obtenidas exitosamente',
    schema: {
      type: 'object',
      example: {
        totalInscritos: 45,
        ingresosTotales: 6750.00,
        porEstado: {
          pendiente: 10,
          confirmado: 30,
          cancelado: 5
        },
        cupoDisponible: 5,
        porcentajeOcupacion: 90
      }
    }
  })
  @ApiNotFoundResponse({
    description: 'Taller no encontrado'
  })
  getEstadisticasByTaller(@Param('idTaller') idTaller: string) {
    return this.detalleInscripcionesService.getEstadisticasByTaller(idTaller);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un detalle de inscripción por ID',
    description: 'Retorna un detalle de inscripción específico por su ID con toda su información'
  })
  @ApiParam({
    name: 'id',
    description: 'ID del detalle de inscripción (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439014'
  })
  @ApiResponse({
    status: 200,
    description: 'Detalle de inscripción encontrado exitosamente',
    type: DetalleInscripcion
  })
  @ApiNotFoundResponse({
    description: 'Detalle de inscripción no encontrado'
  })
  findOne(@Param('id') id: string): Promise<DetalleInscripcion> {
    return this.detalleInscripcionesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un detalle de inscripción',
    description: 'Actualiza la información de un detalle de inscripción específico'
  })
  @ApiParam({
    name: 'id',
    description: 'ID del detalle de inscripción a actualizar (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439014'
  })
  @ApiBody({ type: UpdateDetalleInscripcionDto })
  @ApiResponse({
    status: 200,
    description: 'Detalle de inscripción actualizado exitosamente',
    type: DetalleInscripcion
  })
  @ApiNotFoundResponse({
    description: 'Detalle de inscripción no encontrado'
  })
  @ApiBadRequestResponse({
    description: 'Datos de actualización inválidos'
  })
  update(@Param('id') id: string, @Body() updateDetalleInscripcionDto: UpdateDetalleInscripcionDto): Promise<DetalleInscripcion> {
    return this.detalleInscripcionesService.update(id, updateDetalleInscripcionDto);
  }

  @Patch(':id/estado')
  @ApiOperation({
    summary: 'Cambiar estado de un detalle de inscripción',
    description: 'Actualiza el estado de un detalle de inscripción específico (pendiente, confirmado, cancelado)'
  })
  @ApiParam({
    name: 'id',
    description: 'ID del detalle de inscripción (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439014'
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        estado: {
          type: 'string',
          enum: ['pendiente', 'confirmado', 'cancelado'],
          example: 'confirmado',
          description: 'Nuevo estado del detalle de inscripción'
        }
      },
      required: ['estado']
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Estado del detalle de inscripción cambiado exitosamente',
    type: DetalleInscripcion
  })
  @ApiNotFoundResponse({
    description: 'Detalle de inscripción no encontrado'
  })
  @ApiBadRequestResponse({
    description: 'Estado inválido. Debe ser: pendiente, confirmado o cancelado'
  })
  cambiarEstado(@Param('id') id: string, @Body('estado') estado: string): Promise<DetalleInscripcion> {
    return this.detalleInscripcionesService.cambiarEstado(id, estado);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Eliminar un detalle de inscripción',
    description: 'Elimina permanentemente un detalle de inscripción del sistema (operación irreversible)'
  })
  @ApiParam({
    name: 'id',
    description: 'ID del detalle de inscripción a eliminar (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439014'
  })
  @ApiResponse({
    status: 204,
    description: 'Detalle de inscripción eliminado exitosamente'
  })
  @ApiNotFoundResponse({
    description: 'Detalle de inscripción no encontrado'
  })
  async remove(@Param('id') id: string): Promise<void> {
    await this.detalleInscripcionesService.remove(id);
  }
}