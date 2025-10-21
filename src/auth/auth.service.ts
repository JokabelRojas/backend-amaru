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
    const user = await this.usuariosService.findByEmail(email); // Buscar usuario por email
    
    if (!user) {
      return null;
    } // Si no se encuentra el usuario, retornar null
    
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return null; 
    } // Si la contraseña no es válida, retornar null
    
    const { contrasena, ...result } = user.toObject(); 
    return result;
  } // El método validateUser verifica las credenciales del usuario.

  async login(user: any) {
    const payload = {
      email: user.email, 
      sub: user._id.toString(),
      rol: user.id_rol 
    }; // Crear el payload del token JWT
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {  
        id: user._id.toString(), 
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        rol: user.id_rol
      } // Incluir información del usuario en la respuesta
    };
  } // El método login genera un token JWT con el payload que incluye el email, ID y rol del usuario.

  async register(createUserDto: any) {
    const existingUser = await this.usuariosService.findByEmail(createUserDto.email); // Buscar usuario por email
    if (existingUser) {
      throw new UnauthorizedException('El usuario ya existe');
    } // Verificar si el email ya está registrado
    const existingUserByDni = await this.usuariosService.findByDni(createUserDto.dni);
    if (existingUserByDni) {
      throw new UnauthorizedException('El DNI ya está registrado');
    }// Verificar si el DNI ya está registrado
    
    const adminRole = await this.rolModel.findOne({ nombre: 'admin' });
    if (!adminRole) {
      throw new UnauthorizedException('Rol admin no encontrado');
    } // Buscar el rol "admin"
    
    const userData = {
      ...createUserDto,
      contrasena: createUserDto.password,
      id_rol: adminRole._id
    }; // Preparar los datos del nuevo usuario con rol de administrador
    
    const user = await this.usuariosService.create(userData); // Crear el nuevo usuario
    const { contrasena, ...result } = user.toObject(); // Excluir la contraseña de la respuesta
    return result;
  } // El método register crea un nuevo usuario con rol de administrador después de verificar que 
  // el email y DNI no existan.

  async registerUser(createUserDto: any) {
    const existingUser = await this.usuariosService.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new UnauthorizedException('El usuario ya existe');
    } // Verificar si el email ya está registrado
    const existingUserByDni = await this.usuariosService.findByDni(createUserDto.dni);
    if (existingUserByDni) {
      throw new UnauthorizedException('El DNI ya está registrado');
    } // Verificar si el DNI ya está registrado
    
    const userRole = await this.rolModel.findOne({ nombre: 'user' });
    if (!userRole) {
      throw new UnauthorizedException('Rol user no encontrado');
    } // Buscar el rol "user"
    
    const userData = {
      ...createUserDto,
      contrasena: createUserDto.password,
      id_rol: userRole._id // Asigna rol "user"
    }; // Preparar los datos del nuevo usuario con rol de usuario normal
    
    const user = await this.usuariosService.create(userData); // Crear el nuevo usuario
    const { contrasena, ...result } = user.toObject();    // Excluir la contraseña de la respuesta
    return result;
  } // El método registerUser crea un nuevo usuario con rol de usuario normal
}