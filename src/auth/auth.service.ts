import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../modules/usuarios/usuarios.service';
import { UsuarioDocument } from '../entities/usuario.entity';
import { Rol } from 'src/entities/rol.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService, // es un servicio que nos permite crar y autenticar tokens
    @InjectModel(Rol.name) private rolModel: Model<Rol>,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usuariosService.findByEmail(email); // busca el usuario por el email
    
    if (!user) {
      return null;
    }
    
    const isPasswordValid = await user.comparePassword(password); //compara que la contraseña este vinculada al email que le dimos arriba
    if (!isPasswordValid) {
      return null;
    }
    
    const { contrasena, ...result } = user.toObject(); 
    return result;
  }

  async login(user: any) {
    const payload = {   // informacion que lleva el token
      email: user.email, 
      sub: user._id.toString(),
      rol: user.id_rol 
    };
    
    return { // informacion que se nos retorna como response al loguearnos 
      access_token: this.jwtService.sign(payload), // genera el token 
      user: {  
        id: user._id.toString(), 
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        rol: user.id_rol
      }
    };
  }

  async register(createUserDto: any) { // crear un nuevo usuario, solo el admin puede crear usuarios
    const existingUser = await this.usuariosService.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new UnauthorizedException('El usuario ya existe');
    }
    const existingUserByDni = await this.usuariosService.findByDni(createUserDto.dni);
    if (existingUserByDni) { // vereficamos que el dni no este repetido
      throw new UnauthorizedException('El DNI ya está registrado');
    }
    
    const adminRole = await this.rolModel.findOne({ nombre: 'admin' });
    if (!adminRole) { // si no existe el rol de administrador, lanza el error de rol admin no encontrado
      throw new UnauthorizedException('Rol admin no encontrado');
    }
    
    const userData = { // tenemos que crear el usuario con el id del administrador, osea con el rol del adminsitrador
      ...createUserDto,
      contrasena: createUserDto.password,
      id_rol: adminRole._id
    };
    
    const user = await this.usuariosService.create(userData); // esta es la variable que guarda el usuario en la base de datos
    const { contrasena, ...result } = user.toObject(); // esto es para no retornar la contraseña en el response, por que esta en la base de datos, de manera hasheada, y no tiene sentido devolver una contraseña que ya esta encriptada
    return result;
  }
}