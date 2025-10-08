import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  HttpCode,
  HttpStatus,
  Query 
} from '@nestjs/common';
import { TalleresService } from './talleres.service';
import { CreateTallerDto } from './dto/create-talleres.dto';
import { UpdateTallerDto } from './dto/update-talleres.dto';
import { Taller } from 'src/entities/taller.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBadRequestResponse,
  ApiNotFoundResponse
} from '@nestjs/swagger';

@ApiTags('talleres')
@Controller('talleres')
export class TalleresController {
  constructor(private readonly talleresService: TalleresService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo taller',
    description: 'Crea un nuevo taller en el sistema con toda la información requerida'
  })
  @ApiBody({ type: CreateTallerDto })
  @ApiResponse({
    status: 201,
    description: 'Taller creado exitosamente',
    type: Taller
  })
  @ApiBadRequestResponse({
    description: 'Datos inválidos, fechas inconsistentes o ID de subcategoría no existe'
  })
  async create(@Body() createTallerDto: CreateTallerDto): Promise<Taller> {
    return this.talleresService.create(createTallerDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los talleres',
    description: 'Retorna una lista completa de todos los talleres del sistema'
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de talleres obtenida exitosamente',
    type: [Taller]
  })
  async findAll(): Promise<Taller[]> {
    return this.talleresService.findAll();
  }

  @Get('activos')
  @ApiOperation({
    summary: 'Obtener talleres activos',
    description: 'Retorna solo los talleres que están en estado activo'
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de talleres activos obtenida exitosamente',
    type: [Taller]
  })
  async findActivos(): Promise<Taller[]> {
    return this.talleresService.findActivos();
  }

  @Get('proximos')
  @ApiOperation({
    summary: 'Obtener próximos talleres',
    description: 'Retorna los talleres que están por comenzar (fecha futura)'
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de próximos talleres obtenida exitosamente',
    type: [Taller]
  })
  async findProximos(): Promise<Taller[]> {
    return this.talleresService.findProximos();
  }

  @Get('subcategoria/:idSubcategoria')
  @ApiOperation({
    summary: 'Obtener talleres por subcategoría',
    description: 'Retorna todos los talleres asociados a una subcategoría específica'
  })
  @ApiParam({
    name: 'idSubcategoria',
    description: 'ID de la subcategoría (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439011'
  })
  @ApiResponse({
    status: 200,
    description: 'Talleres de la subcategoría especificada',
    type: [Taller]
  })
  @ApiNotFoundResponse({
    description: 'Subcategoría no encontrada'
  })
  async findBySubcategoria(@Param('idSubcategoria') idSubcategoria: string): Promise<Taller[]> {
    return this.talleresService.findBySubcategoria(idSubcategoria);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un taller por ID',
    description: 'Retorna un taller específico por su ID con toda su información'
  })
  @ApiParam({
    name: 'id',
    description: 'ID del taller (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439012'
  })
  @ApiResponse({
    status: 200,
    description: 'Taller encontrado exitosamente',
    type: Taller
  })
  @ApiNotFoundResponse({
    description: 'Taller no encontrado'
  })
  async findOne(@Param('id') id: string): Promise<Taller> {
    return this.talleresService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un taller',
    description: 'Actualiza la información de un taller específico'
  })
  @ApiParam({
    name: 'id',
    description: 'ID del taller a actualizar (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439012'
  })
  @ApiBody({ type: UpdateTallerDto })
  @ApiResponse({
    status: 200,
    description: 'Taller actualizado exitosamente',
    type: Taller
  })
  @ApiNotFoundResponse({
    description: 'Taller no encontrado'
  })
  @ApiBadRequestResponse({
    description: 'Datos de actualización inválidos'
  })
  async update(
    @Param('id') id: string, 
    @Body() updateTallerDto: UpdateTallerDto
  ): Promise<Taller> {
    return this.talleresService.update(id, updateTallerDto);
  }

  @Patch(':id/estado')
  @ApiOperation({
    summary: 'Cambiar estado de un taller',
    description: 'Activa o desactiva un taller específico'
  })
  @ApiParam({
    name: 'id',
    description: 'ID del taller (MongoDB ObjectId)',
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
          description: 'Nuevo estado del taller'
        }
      },
      required: ['estado']
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Estado del taller cambiado exitosamente',
    type: Taller
  })
  @ApiNotFoundResponse({
    description: 'Taller no encontrado'
  })
  @ApiBadRequestResponse({
    description: 'Estado inválido. Debe ser "activo" o "inactivo"'
  })
  async cambiarEstado(
    @Param('id') id: string,
    @Body('estado') estado: string
  ): Promise<Taller> {
    return this.talleresService.cambiarEstado(id, estado);
  }

  @Patch(':id/cupo')
  @ApiOperation({
    summary: 'Actualizar cupo disponible',
    description: 'Actualiza el cupo disponible del taller cuando se realizan reservas'
  })
  @ApiParam({
    name: 'id',
    description: 'ID del taller (MongoDB ObjectId)',
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
    type: Taller
  })
  @ApiNotFoundResponse({
    description: 'Taller no encontrado'
  })
  @ApiBadRequestResponse({
    description: 'No hay cupos disponibles o número de cupos inválido'
  })
  async actualizarCupo(
    @Param('id') id: string,
    @Body('cupos_reservados') cuposReservados: number
  ): Promise<Taller> {
    return this.talleresService.actualizarCupo(id, cuposReservados);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Eliminar un taller',
    description: 'Elimina permanentemente un taller del sistema (operación irreversible)'
  })
  @ApiParam({
    name: 'id',
    description: 'ID del taller a eliminar (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439012'
  })
  @ApiResponse({
    status: 204,
    description: 'Taller eliminado exitosamente'
  })
  @ApiNotFoundResponse({
    description: 'Taller no encontrado'
  })
  async remove(@Param('id') id: string): Promise<void> {
    await this.talleresService.remove(id);
  }
}