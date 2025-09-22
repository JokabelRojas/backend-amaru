import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from '../../entities/usuario.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Roles } from '../../auth/decorators/roles.decorator';

@Controller('usuarios')
@UseGuards(JwtAuthGuard) //guard para proteger las rutas
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  @Roles('admin') // solo el admin puede crear usuarios
  create(@Body() createUsuarioDto: any): Promise<Usuario> {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get()
  @Roles('admin') //solo el admin puede ver todos los usuarios
  findAll(): Promise<Usuario[]> {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  @Roles('admin')
  findOne(@Param('id') id: string): Promise<Usuario> {
    return this.usuariosService.findOne(id);
  }

  @Put(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateUsuarioDto: any): Promise<Usuario> {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string): Promise<Usuario> {
    return this.usuariosService.remove(id);
  }
}