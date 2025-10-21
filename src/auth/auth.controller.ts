import { 
  Controller, 
  Post, 
  Body, 
  HttpCode, 
  HttpStatus, 
  UnauthorizedException 
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiBody 
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {} // Inyectar el servicio de autenticación

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Iniciar sesión', 
    description: 'Autentica un usuario con email y contraseña' 
  })  // Definir la operación de inicio de sesión
  @ApiBody({ type: LoginDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Login exitoso, retorna token de acceso' 
  }) // Definir la respuesta exitosa
  @ApiResponse({ 
    status: 401, 
    description: 'Credenciales inválidas' 
  }) // Definir la respuesta de error por credenciales inválidas
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password); // Validar las credenciales del usuario
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    } // Validar las credenciales del usuario
    return this.authService.login(user);
  } // El método login maneja la solicitud de inicio de sesión

  @Post('register')
  @ApiOperation({ 
    summary: 'Registrar nuevo administrador', 
    description: 'Crea una nueva cuenta de administrador' 
  }) // Definir la operación de registro de administrador
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Administrador registrado exitosamente' 
  }) // Definir la respuesta exitosa
  @ApiResponse({ 
    status: 400, 
    description: 'Datos de registro inválidos' 
  }) // Definir la respuesta de error por datos inválidos
  @ApiResponse({ 
    status: 409, 
    description: 'El usuario ya existe (email o DNI duplicado)' 
  }) // Definir la respuesta de error por usuario existente
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  } // El método register maneja la solicitud de registro de administrador

  @Post('register-user')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ 
    summary: 'Registrar nuevo usuario normal', 
    description: 'Crea una nueva cuenta de usuario con rol "user"' 
  }) // Definir la operación de registro de usuario normal
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Usuario registrado exitosamente' 
  }) // Definir la respuesta exitosa
  @ApiResponse({ 
    status: 400, 
    description: 'Datos de registro inválidos' 
  }) // Definir la respuesta de error por datos inválidos
  @ApiResponse({ 
    status: 409, 
    description: 'El usuario ya existe (email o DNI duplicado)' 
  }) // Definir la respuesta de error por usuario existente
  async registerUser(@Body() registerDto: RegisterDto) {
    return this.authService.registerUser(registerDto);
  } // El método registerUser maneja la solicitud de registro de usuario normal
}