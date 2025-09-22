import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles); // decorador que define los roles permitidos para acceder a una ruta