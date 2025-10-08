import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from '../../entities/usuario.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiBearerAuth, ApiUnauthorizedResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { CreateUsuarioDto } from './dto/create-usuarios.dto'; 

@ApiTags('usuarios')
@ApiBearerAuth()
@Controller('usuarios')
@UseGuards(JwtAuthGuard)
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  @Roles('admin')
  @ApiOperation({ 
    summary: 'Crear un nuevo usuario', 
    description: 'Crea un nuevo usuario. Requiere rol de administrador.' 
  })
  @ApiBody({ type: CreateUsuarioDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Usuario creado exitosamente',
    type: Usuario 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Datos de usuario inválidos' 
  })
  @ApiUnauthorizedResponse({ 
    description: 'No autorizado - Token JWT inválido o faltante' 
  })
  @ApiForbiddenResponse({ 
    description: 'Prohibido - Se requiere rol de administrador' 
  })
  create(@Body() createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get()
  @Roles('admin')
  @ApiOperation({ 
    summary: 'Obtener todos los usuarios', 
    description: 'Retorna una lista de todos los usuarios. Requiere rol de administrador.' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de usuarios obtenida exitosamente',
    type: [Usuario] 
  })
  @ApiUnauthorizedResponse({ 
    description: 'No autorizado - Token JWT inválido o faltante' 
  })
  @ApiForbiddenResponse({ 
    description: 'Prohibido - Se requiere rol de administrador' 
  })
  findAll(): Promise<Usuario[]> {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  @Roles('admin')
  @ApiOperation({ 
    summary: 'Obtener un usuario por ID', 
    description: 'Retorna un usuario específico por su ID. Requiere rol de administrador.' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID del usuario (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439011'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Usuario encontrado exitosamente',
    type: Usuario 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Usuario no encontrado' 
  })
  @ApiUnauthorizedResponse({ 
    description: 'No autorizado - Token JWT inválido o faltante' 
  })
  @ApiForbiddenResponse({ 
    description: 'Prohibido - Se requiere rol de administrador' 
  })
  findOne(@Param('id') id: string): Promise<Usuario> {
    return this.usuariosService.findOne(id);
  }

  @Put(':id')
  @Roles('admin')
  @ApiOperation({ 
    summary: 'Actualizar un usuario', 
    description: 'Actualiza la información de un usuario específico. Requiere rol de administrador.' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID del usuario a actualizar (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439011'
  })
  @ApiBody({ type: CreateUsuarioDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Usuario actualizado exitosamente',
    type: Usuario 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Usuario no encontrado' 
  })
  @ApiUnauthorizedResponse({ 
    description: 'No autorizado - Token JWT inválido o faltante' 
  })
  @ApiForbiddenResponse({ 
    description: 'Prohibido - Se requiere rol de administrador' 
  })
  update(@Param('id') id: string, @Body() updateUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ 
    summary: 'Eliminar un usuario', 
    description: 'Elimina un usuario específico por su ID. Requiere rol de administrador.' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID del usuario a eliminar (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439011'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Usuario eliminado exitosamente',
    type: Usuario 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Usuario no encontrado' 
  })
  @ApiUnauthorizedResponse({ 
    description: 'No autorizado - Token JWT inválido o faltante' 
  })
  @ApiForbiddenResponse({ 
    description: 'Prohibido - Se requiere rol de administrador' 
  })
  remove(@Param('id') id: string): Promise<Usuario> {
    return this.usuariosService.remove(id);
  }
}