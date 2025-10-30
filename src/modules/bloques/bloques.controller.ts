import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { BloquesService } from './bloques.service';
import { CreateBloqueDto } from './dto/create-bloques.dto';
import { UpdateBloqueDto } from './dto/update-bloques.dto';
import { Bloque } from 'src/entities/bloque.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBadRequestResponse,
  ApiNotFoundResponse
} from '@nestjs/swagger';

@ApiTags('bloques')
@Controller('bloques')
export class BloquesController {
  constructor(private readonly bloquesService: BloquesService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo bloque',
    description: 'Crea un nuevo bloque asociado a un taller existente'
  }) // Definir la operación de creación de bloque
  @ApiBody({ type: CreateBloqueDto })
  @ApiResponse({
    status: 201,
    description: 'Bloque creado exitosamente',
    type: Bloque
  }) // Definir la respuesta exitosa
  @ApiBadRequestResponse({
    description: 'Datos inválidos, fechas inconsistentes o ID de taller no existe'
  }) // Definir la respuesta de error por datos inválidos
  create(@Body() createBloqueDto: CreateBloqueDto): Promise<Bloque> {
    return this.bloquesService.create(createBloqueDto);
  } // El método create maneja la solicitud de creación de un nuevo bloque

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los bloques',
    description: 'Retorna una lista completa de todos los bloques del sistema'
  }) // Definir la operación de obtención de todos los bloques
  @ApiResponse({
    status: 200,
    description: 'Lista de bloques obtenida exitosamente',
    type: [Bloque]
  }) // Definir la respuesta exitosa
  findAll(): Promise<Bloque[]> {
    return this.bloquesService.findAll();
  } // El método findAll maneja la solicitud de obtención de todos los bloques

  @Get('taller/:idTaller')
  @ApiOperation({
    summary: 'Obtener bloques por taller',
    description: 'Retorna todos los bloques asociados a un taller específico'
  }) // Definir la operación de obtención de bloques por taller
  @ApiParam({
    name: 'idTaller',
    description: 'ID del taller (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439011'
  }) // Definir el parámetro de ruta idTaller
  @ApiResponse({
    status: 200,
    description: 'Bloques del taller especificado',
    type: [Bloque]
  }) // Definir la respuesta exitosa
  @ApiNotFoundResponse({
    description: 'Taller no encontrado'
  }) // Definir la respuesta de error por taller no encontrado
  findByTaller(@Param('idTaller') idTaller: string): Promise<Bloque[]> {
    return this.bloquesService.findByTaller(idTaller);
  }//   El método findByTaller maneja la solicitud de obtención de bloques por taller

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un bloque por ID',
    description: 'Retorna un bloque específico por su ID con toda su información'
  }) // Definir la operación de obtención de un bloque por ID
  @ApiParam({
    name: 'id',
    description: 'ID del bloque (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439012'
  }) // Definir el parámetro de ruta id
  @ApiResponse({
    status: 200,
    description: 'Bloque encontrado exitosamente',
    type: Bloque
  }) // Definir la respuesta exitosa
  @ApiNotFoundResponse({
    description: 'Bloque no encontrado'
  }) // Definir la respuesta de error por bloque no encontrado
  findOne(@Param('id') id: string): Promise<Bloque> {
    return this.bloquesService.findOne(id);
  } // El método findOne maneja la solicitud de obtención de un bloque por ID

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un bloque',
    description: 'Actualiza la información de un bloque específico'
  }) // Definir la operación de actualización de un bloque
  @ApiParam({
    name: 'id',
    description: 'ID del bloque a actualizar (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439012'
  }) // Definir el parámetro de ruta id
  @ApiBody({ type: UpdateBloqueDto })
  @ApiResponse({
    status: 200,
    description: 'Bloque actualizado exitosamente',
    type: Bloque
  }) // Definir la respuesta exitosa
  @ApiNotFoundResponse({
    description: 'Bloque no encontrado'
  }) // Definir la respuesta de error por bloque no encontrado
  @ApiBadRequestResponse({
    description: 'Datos de actualización inválidos'
  }) // Definir la respuesta de error por datos inválidos
  update(@Param('id') id: string, @Body() updateBloqueDto: UpdateBloqueDto): Promise<Bloque> {
    return this.bloquesService.update(id, updateBloqueDto);
  } // El método update maneja la solicitud de actualización de un bloque

  @Patch(':id/estado')
  @ApiOperation({
    summary: 'Cambiar estado de un bloque',
    description: 'Activa o desactiva un bloque específico'
  }) // Definir la operación de cambio de estado de un bloque
  @ApiParam({
    name: 'id',
    description: 'ID del bloque (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439012'
  }) // Definir el parámetro de ruta id
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        estado: {
          type: 'string',
          enum: ['activo', 'inactivo'],
          example: 'activo',
          description: 'Nuevo estado del bloque'
        }
      },
      required: ['estado']
    }
  }) // Definir el cuerpo de la solicitud para cambiar el estado
  @ApiResponse({
    status: 200,
    description: 'Estado del bloque cambiado exitosamente',
    type: Bloque
  }) // Definir la respuesta exitosa
  @ApiNotFoundResponse({
    description: 'Bloque no encontrado'
  }) // Definir la respuesta de error por bloque no encontrado
  @ApiBadRequestResponse({
    description: 'Estado inválido. Debe ser "activo" o "inactivo"'
  }) // Definir la respuesta de error por estado inválido
  cambiarEstado(@Param('id') id: string, @Body('estado') estado: string): Promise<Bloque> {
    return this.bloquesService.cambiarEstado(id, estado);
  } // El método cambiarEstado maneja la solicitud de cambio de estado de un bloque

  @Patch(':id/cupo')
  @ApiOperation({
    summary: 'Actualizar cupo disponible',
    description: 'Actualiza el cupo disponible del bloque cuando se realizan reservas'
  }) // Definir la operación de actualización de cupo disponible
  @ApiParam({
    name: 'id',
    description: 'ID del bloque (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439012'
  }) // Definir el parámetro de ruta id
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        cupos_reservados: {
          type: 'number',
          example: 2,
          minimum: 1,
          description: 'Número de cupos a reservar'
        }
      },
      required: ['cupos_reservados']
    }
  }) // Definir el cuerpo de la solicitud para actualizar el cupo
  @ApiResponse({
    status: 200,
    description: 'Cupo actualizado exitosamente',
    type: Bloque
  }) // Definir la respuesta exitosa
  @ApiNotFoundResponse({
    description: 'Bloque no encontrado'
  }) // Definir la respuesta de error por bloque no encontrado
  @ApiBadRequestResponse({
    description: 'No hay cupos disponibles o número de cupos inválido'
  }) // Definir la respuesta de error por cupos inválidos
  actualizarCupo(@Param('id') id: string, @Body('cupos_reservados') cuposReservados: number): Promise<Bloque> {
    return this.bloquesService.actualizarCupo(id, cuposReservados);
  }  // El método actualizarCupo maneja la solicitud de actualización de cupo disponible

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Eliminar un bloque',
    description: 'Elimina permanentemente un bloque del sistema (operación irreversible)'
  }) // Definir la operación de eliminación de un bloque
  @ApiParam({
    name: 'id',
    description: 'ID del bloque a eliminar (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439012'
  }) // Definir el parámetro de ruta id
  @ApiResponse({
    status: 204,
    description: 'Bloque eliminado exitosamente'
  }) // Definir la respuesta exitosa
  @ApiNotFoundResponse({
    description: 'Bloque no encontrado'
  }) // Definir la respuesta de error por bloque no encontrado
  async remove(@Param('id') id: string): Promise<void> {
    await this.bloquesService.remove(id);
  } // El método remove maneja la solicitud de eliminación de un bloque
}