import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../modules/usuarios/usuarios.service';
import { Rol } from 'src/entities/rol.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
    @InjectModel(Rol.name) private rolModel: Model<Rol>,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usuariosService.findByEmail(email);
    
    if (!user) {
      return null;
    }
    
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return null;
    }
    
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
    const existingUser = await this.usuariosService.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new UnauthorizedException('El usuario ya existe');
    }
    const existingUserByDni = await this.usuariosService.findByDni(createUserDto.dni);
    if (existingUserByDni) {
      throw new UnauthorizedException('El DNI ya está registrado');
    }
    
    const adminRole = await this.rolModel.findOne({ nombre: 'admin' });
    if (!adminRole) {
      throw new UnauthorizedException('Rol admin no encontrado');
    }
    
    const userData = {
      ...createUserDto,
      contrasena: createUserDto.password,
      id_rol: adminRole._id
    };
    
    const user = await this.usuariosService.create(userData);
    const { contrasena, ...result } = user.toObject();
    return result;
  }

  async registerUser(createUserDto: any) {
    const existingUser = await this.usuariosService.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new UnauthorizedException('El usuario ya existe');
    }
    const existingUserByDni = await this.usuariosService.findByDni(createUserDto.dni);
    if (existingUserByDni) {
      throw new UnauthorizedException('El DNI ya está registrado');
    }
    
    // Buscar el rol "user" (usuario normal)
    const userRole = await this.rolModel.findOne({ nombre: 'user' });
    if (!userRole) {
      throw new UnauthorizedException('Rol user no encontrado');
    }
    
    const userData = {
      ...createUserDto,
      contrasena: createUserDto.password,
      id_rol: userRole._id 
    };
    
    const user = await this.usuariosService.create(userData);
    const { contrasena, ...result } = user.toObject();
    return result;
  }
}