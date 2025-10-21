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
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Iniciar sesión', 
    description: 'Autentica un usuario con email y contraseña' 
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Login exitoso, retorna token de acceso' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Credenciales inválidas' 
  })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    return this.authService.login(user);
  }

  @Post('register')
  @ApiOperation({ 
    summary: 'Registrar nuevo administrador', 
    description: 'Crea una nueva cuenta de administrador' 
  })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Administrador registrado exitosamente' 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Datos de registro inválidos' 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'El usuario ya existe (email o DNI duplicado)' 
  })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  // NUEVO ENDPOINT PARA REGISTRAR USUARIOS NORMALES
  @Post('register-user')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ 
    summary: 'Registrar nuevo usuario normal', 
    description: 'Crea una nueva cuenta de usuario con rol "user"' 
  })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Usuario registrado exitosamente' 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Datos de registro inválidos' 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'El usuario ya existe (email o DNI duplicado)' 
  })
  async registerUser(@Body() registerDto: RegisterDto) {
    return this.authService.registerUser(registerDto);
  }
}