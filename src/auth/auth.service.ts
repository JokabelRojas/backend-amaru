import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../modules/usuarios/usuarios.service';
import { UsuarioDocument } from '../entities/usuario.entity';

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usuariosService.findByEmail(email);
    
    // Verificar explícitamente que user no sea null
    if (!user) {
      return null;
    }
    
    // Verificar la contraseña usando el método del documento
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return null;
    }
    
    // Eliminar la contraseña del objeto de retorno
    const { contrasena, ...result } = user.toObject();
    return result;
  }

  async login(user: any) {
    const payload = { 
      email: user.email, 
      sub: user._id.toString(),
      rol: user.id_rol 
    };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user._id.toString(),
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        rol: user.id_rol
      }
    };
  }

  async register(createUserDto: any) {
    // Verificar si el usuario ya existe
    const existingUser = await this.usuariosService.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new UnauthorizedException('El usuario ya existe');
    }
    
    const user = await this.usuariosService.create(createUserDto);
    const { contrasena, ...result } = user.toObject();
    return result;
  }
}