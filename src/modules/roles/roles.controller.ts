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
  })
  @ApiBody({ type: CreateRolDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Rol creado exitosamente',
    type: Rol 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Datos del rol inválidos' 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'El nombre del rol ya existe' 
  })
  @ApiUnauthorizedResponse({ 
    description: 'No autorizado - Token JWT inválido o faltante' 
  })
  @ApiForbiddenResponse({ 
    description: 'Prohibido - Se requiere rol de administrador' 
  })
  create(@Body() createRolDto: CreateRolDto): Promise<Rol> {
    return this.rolesService.create(createRolDto);
  }

  @Get()
  @Roles('admin')
  @ApiOperation({ 
    summary: 'Obtener todos los roles', 
    description: 'Retorna una lista de todos los roles del sistema. Requiere rol de administrador.' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de roles obtenida exitosamente',
    type: [Rol] 
  })
  @ApiUnauthorizedResponse({ 
    description: 'No autorizado - Token JWT inválido o faltante' 
  })
  @ApiForbiddenResponse({ 
    description: 'Prohibido - Se requiere rol de administrador' 
  })
  findAll(): Promise<Rol[]> {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @Roles('admin')
  @ApiOperation({ 
    summary: 'Obtener un rol por ID', 
    description: 'Retorna un rol específico por su ID. Requiere rol de administrador.' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID del rol (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439011'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Rol encontrado exitosamente',
    type: Rol 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Rol no encontrado' 
  })
  @ApiUnauthorizedResponse({ 
    description: 'No autorizado - Token JWT inválido o faltante' 
  })
  @ApiForbiddenResponse({ 
    description: 'Prohibido - Se requiere rol de administrador' 
  })
  findOne(@Param('id') id: string): Promise<Rol> {
    return this.rolesService.findOne(id);
  }

  @Put(':id')
  @Roles('admin')
  @ApiOperation({ 
    summary: 'Actualizar un rol', 
    description: 'Actualiza la información de un rol específico. Requiere rol de administrador.' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID del rol a actualizar (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439011'
  })
  @ApiBody({ type: UpdateRolDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Rol actualizado exitosamente',
    type: Rol 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Rol no encontrado' 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'El nombre del rol ya existe' 
  })
  @ApiUnauthorizedResponse({ 
    description: 'No autorizado - Token JWT inválido o faltante' 
  })
  @ApiForbiddenResponse({ 
    description: 'Prohibido - Se requiere rol de administrador' 
  })
  update(@Param('id') id: string, @Body() updateRolDto: UpdateRolDto): Promise<Rol> {
    return this.rolesService.update(id, updateRolDto);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ 
    summary: 'Eliminar un rol', 
    description: 'Elimina un rol específico por su ID. Requiere rol de administrador.' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID del rol a eliminar (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439011'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Rol eliminado exitosamente',
    type: Rol 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Rol no encontrado' 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'No se puede eliminar el rol porque está en uso' 
  })
  @ApiUnauthorizedResponse({ 
    description: 'No autorizado - Token JWT inválido o faltante' 
  })
  @ApiForbiddenResponse({ 
    description: 'Prohibido - Se requiere rol de administrador' 
  })
  remove(@Param('id') id: string): Promise<Rol> {
    return this.rolesService.remove(id);
  }
}