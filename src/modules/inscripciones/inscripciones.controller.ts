import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { InscripcionesService } from './inscripciones.service';
import { CreateInscripcionDto } from './dto/create-inscripciones.dto';
import { UpdateInscripcionDto } from './dto/update-inscripciones.dto';
import { Inscripcion } from 'src/entities/inscripcion.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBadRequestResponse,
  ApiNotFoundResponse
} from '@nestjs/swagger';

@ApiTags('inscripciones')
@Controller('inscripciones')
export class InscripcionesController {
  constructor(private readonly inscripcionesService: InscripcionesService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear una nueva inscripción',
    description: 'Crea una nueva inscripción para un usuario en el sistema'
  })
  @ApiBody({ type: CreateInscripcionDto })
  @ApiResponse({
    status: 201,
    description: 'Inscripción creada exitosamente',
    type: Inscripcion
  })
  @ApiBadRequestResponse({
    description: 'Datos inválidos o ID de usuario no existe'
  })
  create(@Body() createInscripcionDto: CreateInscripcionDto): Promise<Inscripcion> {
    return this.inscripcionesService.create(createInscripcionDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todas las inscripciones',
    description: 'Retorna una lista completa de todas las inscripciones del sistema'
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de inscripciones obtenida exitosamente',
    type: [Inscripcion]
  })
  findAll(): Promise<Inscripcion[]> {
    return this.inscripcionesService.findAll();
  }

  @Get('estadisticas')
  @ApiOperation({
    summary: 'Obtener estadísticas de inscripciones',
    description: 'Retorna estadísticas y métricas sobre las inscripciones (totales, por estado, ingresos, etc.)'
  })
  @ApiResponse({
    status: 200,
    description: 'Estadísticas obtenidas exitosamente',
    schema: {
      type: 'object',
      example: {
        totalInscripciones: 150,
        ingresosTotales: 25000.00,
        porEstado: {
          pendiente: 45,
          pagado: 85,
          cancelado: 15,
          completado: 5
        },
        monedaPredominante: 'PEN'
      }
    }
  })
  getEstadisticas() {
    return this.inscripcionesService.getEstadisticas();
  }

  @Get('usuario/:idUsuario')
  @ApiOperation({
    summary: 'Obtener inscripciones por usuario',
    description: 'Retorna todas las inscripciones de un usuario específico'
  })
  @ApiParam({
    name: 'idUsuario',
    description: 'ID del usuario (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439011'
  })
  @ApiResponse({
    status: 200,
    description: 'Inscripciones del usuario especificado',
    type: [Inscripcion]
  })
  @ApiNotFoundResponse({
    description: 'Usuario no encontrado'
  })
  findByUsuario(@Param('idUsuario') idUsuario: string): Promise<Inscripcion[]> {
    return this.inscripcionesService.findByUsuario(idUsuario);
  }

  @Get('estado/:estado')
  @ApiOperation({
    summary: 'Obtener inscripciones por estado',
    description: 'Retorna todas las inscripciones con un estado específico'
  })
  @ApiParam({
    name: 'estado',
    description: 'Estado de las inscripciones a filtrar',
    example: 'pendiente',
    enum: ['pendiente','aprobado','rechazado']
  })
  @ApiResponse({
    status: 200,
    description: 'Inscripciones con el estado especificado',
    type: [Inscripcion]
  })
  @ApiNotFoundResponse({
    description: 'No se encontraron inscripciones con el estado especificado'
  })
  findByEstado(@Param('estado') estado: string): Promise<Inscripcion[]> {
    return this.inscripcionesService.findByEstado(estado);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener una inscripción por ID',
    description: 'Retorna una inscripción específica por su ID con toda su información'
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la inscripción (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439012'
  })
  @ApiResponse({
    status: 200,
    description: 'Inscripción encontrada exitosamente',
    type: Inscripcion
  })
  @ApiNotFoundResponse({
    description: 'Inscripción no encontrada'
  })
  findOne(@Param('id') id: string): Promise<Inscripcion> {
    return this.inscripcionesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar una inscripción',
    description: 'Actualiza la información de una inscripción específica'
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la inscripción a actualizar (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439012'
  })
  @ApiBody({ type: UpdateInscripcionDto })
  @ApiResponse({
    status: 200,
    description: 'Inscripción actualizada exitosamente',
    type: Inscripcion
  })
  @ApiNotFoundResponse({
    description: 'Inscripción no encontrada'
  })
  @ApiBadRequestResponse({
    description: 'Datos de actualización inválidos'
  })
  update(@Param('id') id: string, @Body() updateInscripcionDto: UpdateInscripcionDto): Promise<Inscripcion> {
    return this.inscripcionesService.update(id, updateInscripcionDto);
  }

  @Patch(':id/estado')
  @ApiOperation({
    summary: 'Cambiar estado de una inscripción',
    description: 'Actualiza el estado de una inscripción específica (pendiente,aprobado,rechazado)'
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la inscripción (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439012'
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        estado: {
          type: 'string',
          enum: ['pendiente','aprobado','rechazado'],
          example: 'pagado',
          description: 'Nuevo estado de la inscripción'
        }
      },
      required: ['estado']
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Estado de la inscripción cambiado exitosamente',
    type: Inscripcion
  })
  @ApiNotFoundResponse({
    description: 'Inscripción no encontrada'
  })
  @ApiBadRequestResponse({
    description: 'Estado inválido. Debe ser: pendiente,aprobado,rechazado'
  })
  cambiarEstado(@Param('id') id: string, @Body('estado') estado: string): Promise<Inscripcion> {
    return this.inscripcionesService.cambiarEstado(id, estado);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Eliminar una inscripción',
    description: 'Elimina permanentemente una inscripción del sistema (operación irreversible)'
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la inscripción a eliminar (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439012'
  })
  @ApiResponse({
    status: 204,
    description: 'Inscripción eliminada exitosamente'
  })
  @ApiNotFoundResponse({
    description: 'Inscripción no encontrada'
  })
  async remove(@Param('id') id: string): Promise<void> {
    await this.inscripcionesService.remove(id);
  }
}