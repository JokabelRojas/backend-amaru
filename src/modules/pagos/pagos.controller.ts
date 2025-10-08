import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { CreatePagoDto } from './dto/create-pagos.dto';
import { UpdatePagoDto } from './dto/update-pagos.dto';
import { Pago } from 'src/entities/pago.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBadRequestResponse,
  ApiNotFoundResponse
} from '@nestjs/swagger';

@ApiTags('pagos')
@Controller('pagos')
export class PagosController {
  constructor(private readonly pagosService: PagosService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo pago',
    description: 'Registra un nuevo pago asociado a un detalle de inscripción'
  })
  @ApiBody({ type: CreatePagoDto })
  @ApiResponse({
    status: 201,
    description: 'Pago creado exitosamente',
    type: Pago
  })
  @ApiBadRequestResponse({
    description: 'Datos inválidos o IDs de detalle/usuario no existen'
  })
  create(@Body() createPagoDto: CreatePagoDto): Promise<Pago> {
    return this.pagosService.create(createPagoDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los pagos',
    description: 'Retorna una lista completa de todos los pagos del sistema'
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de pagos obtenida exitosamente',
    type: [Pago]
  })
  findAll(): Promise<Pago[]> {
    return this.pagosService.findAll();
  }

  @Get('estadisticas')
  @ApiOperation({
    summary: 'Obtener estadísticas de pagos',
    description: 'Retorna estadísticas y métricas sobre los pagos (totales, por estado, ingresos, etc.)'
  })
  @ApiResponse({
    status: 200,
    description: 'Estadísticas obtenidas exitosamente',
    schema: {
      type: 'object',
      example: {
        totalPagos: 120,
        ingresosTotales: 18000.00,
        porEstado: {
          pendiente: 15,
          completado: 95,
          fallido: 8,
          reembolsado: 2
        },
        porMoneda: {
          PEN: 110,
          USD: 10
        },
        metodoPagoPopular: 'tarjeta_credito'
      }
    }
  })
  getEstadisticas() {
    return this.pagosService.getEstadisticas();
  }

  @Get('usuario/:idUsuario')
  @ApiOperation({
    summary: 'Obtener pagos por usuario',
    description: 'Retorna todos los pagos realizados por un usuario específico'
  })
  @ApiParam({
    name: 'idUsuario',
    description: 'ID del usuario (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439011'
  })
  @ApiResponse({
    status: 200,
    description: 'Pagos del usuario especificado',
    type: [Pago]
  })
  @ApiNotFoundResponse({
    description: 'Usuario no encontrado'
  })
  findByUsuario(@Param('idUsuario') idUsuario: string): Promise<Pago[]> {
    return this.pagosService.findByUsuario(idUsuario);
  }

  @Get('detalle/:idDetalle')
  @ApiOperation({
    summary: 'Obtener pagos por detalle de inscripción',
    description: 'Retorna todos los pagos asociados a un detalle de inscripción específico'
  })
  @ApiParam({
    name: 'idDetalle',
    description: 'ID del detalle de inscripción (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439012'
  })
  @ApiResponse({
    status: 200,
    description: 'Pagos del detalle de inscripción especificado',
    type: [Pago]
  })
  @ApiNotFoundResponse({
    description: 'Detalle de inscripción no encontrado'
  })
  findByDetalle(@Param('idDetalle') idDetalle: string): Promise<Pago[]> {
    return this.pagosService.findByDetalle(idDetalle);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un pago por ID',
    description: 'Retorna un pago específico por su ID con toda su información'
  })
  @ApiParam({
    name: 'id',
    description: 'ID del pago (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439013'
  })
  @ApiResponse({
    status: 200,
    description: 'Pago encontrado exitosamente',
    type: Pago
  })
  @ApiNotFoundResponse({
    description: 'Pago no encontrado'
  })
  findOne(@Param('id') id: string): Promise<Pago> {
    return this.pagosService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un pago',
    description: 'Actualiza la información de un pago específico'
  })
  @ApiParam({
    name: 'id',
    description: 'ID del pago a actualizar (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439013'
  })
  @ApiBody({ type: UpdatePagoDto })
  @ApiResponse({
    status: 200,
    description: 'Pago actualizado exitosamente',
    type: Pago
  })
  @ApiNotFoundResponse({
    description: 'Pago no encontrado'
  })
  @ApiBadRequestResponse({
    description: 'Datos de actualización inválidos'
  })
  update(@Param('id') id: string, @Body() updatePagoDto: UpdatePagoDto): Promise<Pago> {
    return this.pagosService.update(id, updatePagoDto);
  }

  @Patch(':id/estado')
  @ApiOperation({
    summary: 'Cambiar estado de un pago',
    description: 'Actualiza el estado de un pago específico (pendiente, completado, fallido, reembolsado)'
  })
  @ApiParam({
    name: 'id',
    description: 'ID del pago (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439013'
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        estado: {
          type: 'string',
          enum: ['pendiente', 'completado', 'fallido', 'reembolsado'],
          example: 'completado',
          description: 'Nuevo estado del pago'
        }
      },
      required: ['estado']
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Estado del pago cambiado exitosamente',
    type: Pago
  })
  @ApiNotFoundResponse({
    description: 'Pago no encontrado'
  })
  @ApiBadRequestResponse({
    description: 'Estado inválido. Debe ser: pendiente, completado, fallido o reembolsado'
  })
  cambiarEstado(@Param('id') id: string, @Body('estado') estado: string): Promise<Pago> {
    return this.pagosService.cambiarEstado(id, estado);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Eliminar un pago',
    description: 'Elimina permanentemente un pago del sistema (operación irreversible)'
  })
  @ApiParam({
    name: 'id',
    description: 'ID del pago a eliminar (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439013'
  })
  @ApiResponse({
    status: 204,
    description: 'Pago eliminado exitosamente'
  })
  @ApiNotFoundResponse({
    description: 'Pago no encontrado'
  })
  async remove(@Param('id') id: string): Promise<void> {
    await this.pagosService.remove(id);
  }
}