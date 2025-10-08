import { IsString, IsNotEmpty, IsArray, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRolDto {
  @ApiProperty({
    description: 'Nombre único del rol',
    example: 'ADMIN',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiPropertyOptional({
    description: 'Descripción del rol',
    example: 'Rol con permisos de administrador del sistema'
  })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiPropertyOptional({
    description: 'Lista de permisos del rol',
    example: ['usuarios:crear', 'usuarios:editar', 'usuarios:eliminar', 'roles:gestionar'],
    type: [String]
  })
  @IsArray()
  @IsOptional()
  permisos?: string[];

  @ApiPropertyOptional({
    description: 'Estado del rol (activo/inactivo)',
    example: true,
    default: true
  })
  @IsBoolean()
  @IsOptional()
  estado?: boolean;
}