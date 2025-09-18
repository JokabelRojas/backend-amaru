import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, ParseArrayPipe } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Rol } from '../../entities/rol.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { CreateRolDto } from './dto/create-roles.dto';
import { UpdateRolDto } from './dto/update-roles.dto';

@Controller('roles')
// @UseGuards(JwtAuthGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  // @Roles('admin')
  create(@Body() createRolDto: CreateRolDto): Promise<Rol> {
    return this.rolesService.create(createRolDto);
  }

  @Get()
  @Roles('admin')
  findAll(): Promise<Rol[]> {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @Roles('admin')
  findOne(@Param('id') id: string): Promise<Rol> {
    return this.rolesService.findOne(id);
  }

  @Put(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateRolDto: UpdateRolDto): Promise<Rol> {
    return this.rolesService.update(id, updateRolDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string): Promise<Rol> {
    return this.rolesService.remove(id);
  }
}