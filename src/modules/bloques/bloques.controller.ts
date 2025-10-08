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
  })
  @ApiBody({ type: CreateBloqueDto })
  @ApiResponse({
    status: 201,
    description: 'Bloque creado exitosamente',
    type: Bloque
  })
  @ApiBadRequestResponse({
    description: 'Datos inválidos, fechas inconsistentes o ID de taller no existe'
  })
  create(@Body() createBloqueDto: CreateBloqueDto): Promise<Bloque> {
    return this.bloquesService.create(createBloqueDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los bloques',
    description: 'Retorna una lista completa de todos los bloques del sistema'
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de bloques obtenida exitosamente',
    type: [Bloque]
  })
  findAll(): Promise<Bloque[]> {
    return this.bloquesService.findAll();
  }

  @Get('taller/:idTaller')
  @ApiOperation({
    summary: 'Obtener bloques por taller',
    description: 'Retorna todos los bloques asociados a un taller específico'
  })
  @ApiParam({
    name: 'idTaller',
    description: 'ID del taller (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439011'
  })
  @ApiResponse({
    status: 200,
    description: 'Bloques del taller especificado',
    type: [Bloque]
  })
  @ApiNotFoundResponse({
    description: 'Taller no encontrado'
  })
  findByTaller(@Param('idTaller') idTaller: string): Promise<Bloque[]> {
    return this.bloquesService.findByTaller(idTaller);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un bloque por ID',
    description: 'Retorna un bloque específico por su ID con toda su información'
  })
  @ApiParam({
    name: 'id',
    description: 'ID del bloque (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439012'
  })
  @ApiResponse({
    status: 200,
    description: 'Bloque encontrado exitosamente',
    type: Bloque
  })
  @ApiNotFoundResponse({
    description: 'Bloque no encontrado'
  })
  findOne(@Param('id') id: string): Promise<Bloque> {
    return this.bloquesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un bloque',
    description: 'Actualiza la información de un bloque específico'
  })
  @ApiParam({
    name: 'id',
    description: 'ID del bloque a actualizar (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439012'
  })
  @ApiBody({ type: UpdateBloqueDto })
  @ApiResponse({
    status: 200,
    description: 'Bloque actualizado exitosamente',
    type: Bloque
  })
  @ApiNotFoundResponse({
    description: 'Bloque no encontrado'
  })
  @ApiBadRequestResponse({
    description: 'Datos de actualización inválidos'
  })
  update(@Param('id') id: string, @Body() updateBloqueDto: UpdateBloqueDto): Promise<Bloque> {
    return this.bloquesService.update(id, updateBloqueDto);
  }

  @Patch(':id/estado')
  @ApiOperation({
    summary: 'Cambiar estado de un bloque',
    description: 'Activa o desactiva un bloque específico'
  })
  @ApiParam({
    name: 'id',
    description: 'ID del bloque (MongoDB ObjectId)',
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
          description: 'Nuevo estado del bloque'
        }
      },
      required: ['estado']
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Estado del bloque cambiado exitosamente',
    type: Bloque
  })
  @ApiNotFoundResponse({
    description: 'Bloque no encontrado'
  })
  @ApiBadRequestResponse({
    description: 'Estado inválido. Debe ser "activo" o "inactivo"'
  })
  cambiarEstado(@Param('id') id: string, @Body('estado') estado: string): Promise<Bloque> {
    return this.bloquesService.cambiarEstado(id, estado);
  }

  @Patch(':id/cupo')
  @ApiOperation({
    summary: 'Actualizar cupo disponible',
    description: 'Actualiza el cupo disponible del bloque cuando se realizan reservas'
  })
  @ApiParam({
    name: 'id',
    description: 'ID del bloque (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439012'
  })
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
  })
  @ApiResponse({
    status: 200,
    description: 'Cupo actualizado exitosamente',
    type: Bloque
  })
  @ApiNotFoundResponse({
    description: 'Bloque no encontrado'
  })
  @ApiBadRequestResponse({
    description: 'No hay cupos disponibles o número de cupos inválido'
  })
  actualizarCupo(@Param('id') id: string, @Body('cupos_reservados') cuposReservados: number): Promise<Bloque> {
    return this.bloquesService.actualizarCupo(id, cuposReservados);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Eliminar un bloque',
    description: 'Elimina permanentemente un bloque del sistema (operación irreversible)'
  })
  @ApiParam({
    name: 'id',
    description: 'ID del bloque a eliminar (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439012'
  })
  @ApiResponse({
    status: 204,
    description: 'Bloque eliminado exitosamente'
  })
  @ApiNotFoundResponse({
    description: 'Bloque no encontrado'
  })
  async remove(@Param('id') id: string): Promise<void> {
    await this.bloquesService.remove(id);
  }
}