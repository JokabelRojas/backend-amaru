import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, ParseArrayPipe } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Rol } from '../../entities/rol.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { CreateRolDto } from './dto/create-roles.dto';
import { UpdateRolDto } from './dto/update-roles.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiBearerAuth, ApiUnauthorizedResponse, ApiForbiddenResponse, ApiNotFoundResponse } from '@nestjs/swagger';

@ApiTags('roles')
@ApiBearerAuth() 
@Controller('roles')
@UseGuards(JwtAuthGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @Roles('admin')
  @ApiOperation({ 
    summary: 'Crear un nuevo rol', 
    description: 'Crea un nuevo rol en el sistema. Requiere rol de administrador.' 
  }) // Definir la operación de creación de rol
  @ApiBody({ type: CreateRolDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Rol creado exitosamente',
    type: Rol 
  }) // Definir la respuesta exitosa
  @ApiResponse({ 
    status: 400, 
    description: 'Datos del rol inválidos' 
  }) // Definir la respuesta de error por datos inválidos
  @ApiResponse({ 
    status: 409, 
    description: 'El nombre del rol ya existe' 
  }) // Definir la respuesta de error por nombre de rol duplicado
  @ApiUnauthorizedResponse({ 
    description: 'No autorizado - Token JWT inválido o faltante' 
  }) // Definir la respuesta de error por falta de autorización
  @ApiForbiddenResponse({ 
    description: 'Prohibido - Se requiere rol de administrador' 
  }) // Definir la respuesta de error por falta de permisos
  create(@Body() createRolDto: CreateRolDto): Promise<Rol> {
    return this.rolesService.create(createRolDto);
  } // El método create maneja la solicitud de creación de un nuevo rol

  @Get()
  @Roles('admin')
  @ApiOperation({ 
    summary: 'Obtener todos los roles', 
    description: 'Retorna una lista de todos los roles del sistema. Requiere rol de administrador.' 
  }) // Definir la operación de obtención de todos los roles
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de roles obtenida exitosamente',
    type: [Rol] 
  }) // Definir la respuesta exitosa
  @ApiUnauthorizedResponse({ 
    description: 'No autorizado - Token JWT inválido o faltante' 
  }) // Definir la respuesta de error por falta de autorización
  @ApiForbiddenResponse({ 
    description: 'Prohibido - Se requiere rol de administrador' 
  }) // Definir la respuesta de error por falta de permisos
  findAll(): Promise<Rol[]> {
    return this.rolesService.findAll();
  } // El método findAll maneja la solicitud de obtención de todos los roles

  @Get(':id')
  @Roles('admin')
  @ApiOperation({ 
    summary: 'Obtener un rol por ID', 
    description: 'Retorna un rol específico por su ID. Requiere rol de administrador.' 
  }) // Definir la operación de obtención de un rol por ID
  @ApiParam({ 
    name: 'id', 
    description: 'ID del rol (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439011'
  }) // Definir el parámetro de ruta id
  @ApiResponse({ 
    status: 200, 
    description: 'Rol encontrado exitosamente',
    type: Rol 
  }) // Definir la respuesta exitosa
  @ApiResponse({ 
    status: 404, 
    description: 'Rol no encontrado' 
  })    // Definir la respuesta de error por rol no encontrado
  @ApiUnauthorizedResponse({ 
    description: 'No autorizado - Token JWT inválido o faltante' 
  }) // Definir la respuesta de error por falta de autorización
  @ApiForbiddenResponse({ 
    description: 'Prohibido - Se requiere rol de administrador' 
  }) // Definir la respuesta de error por falta de permisos
  findOne(@Param('id') id: string): Promise<Rol> {
    return this.rolesService.findOne(id);
  }   // El método findOne maneja la solicitud de obtención de un rol por ID

  @Put(':id')
  @Roles('admin')
  @ApiOperation({ 
    summary: 'Actualizar un rol', 
    description: 'Actualiza la información de un rol específico. Requiere rol de administrador.' 
  }) // Definir la operación de actualización de rol
  @ApiParam({ 
    name: 'id', 
    description: 'ID del rol a actualizar (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439011'
  }) // Definir el parámetro de ruta id
  @ApiBody({ type: UpdateRolDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Rol actualizado exitosamente',
    type: Rol 
  }) // Definir la respuesta exitosa
  @ApiResponse({ 
    status: 404, 
    description: 'Rol no encontrado' 
  }) // Definir la respuesta de error por rol no encontrado
  @ApiResponse({ 
    status: 409, 
    description: 'El nombre del rol ya existe' 
  })  // Definir la respuesta de error por nombre de rol duplicado
  @ApiUnauthorizedResponse({ 
    description: 'No autorizado - Token JWT inválido o faltante' 
  }) // Definir la respuesta de error por falta de autorización
  @ApiForbiddenResponse({ 
    description: 'Prohibido - Se requiere rol de administrador' 
  }) // Definir la respuesta de error por falta de permisos
  update(@Param('id') id: string, @Body() updateRolDto: UpdateRolDto): Promise<Rol> {
    return this.rolesService.update(id, updateRolDto);
  }  // El método update maneja la solicitud de actualización de un rol

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ 
    summary: 'Eliminar un rol', 
    description: 'Elimina un rol específico por su ID. Requiere rol de administrador.' 
  }) // Definir la operación de eliminación de rol
  @ApiParam({ 
    name: 'id', 
    description: 'ID del rol a eliminar (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439011'
  }) // Definir el parámetro de ruta id
  @ApiResponse({ 
    status: 200, 
    description: 'Rol eliminado exitosamente',
    type: Rol 
  }) // Definir la respuesta exitosa
  @ApiResponse({ 
    status: 404, 
    description: 'Rol no encontrado' 
  }) // Definir la respuesta de error por rol no encontrado
  @ApiResponse({ 
    status: 400, 
    description: 'No se puede eliminar el rol porque está en uso' 
  })  // Definir la respuesta de error por rol en uso
  @ApiUnauthorizedResponse({ 
    description: 'No autorizado - Token JWT inválido o faltante' 
  }) // Definir la respuesta de error por falta de autorización
  @ApiForbiddenResponse({ 
    description: 'Prohibido - Se requiere rol de administrador' 
  }) // Definir la respuesta de error por falta de permisos
  remove(@Param('id') id: string): Promise<Rol> {
    return this.rolesService.remove(id);
  } // El método remove maneja la solicitud de eliminación de un rol
}