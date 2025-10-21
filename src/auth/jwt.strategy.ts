import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }  //este codigo es para extraer el token JWT del encabezado de autorización como un token Bearer. 
  // La estrategia no ignora la expiración del token y utiliza una clave secreta obtenida del servicio 
  // de configuración para validar el token.
  async validate(payload: any) {
    return { 
      userId: payload.sub, 
      email: payload.email,
      rol: payload.rol 
    };
  }
  // El método validate se llama automáticamente después de que el token JWT ha sido verificado.
}
// Este método extrae la información relevante del payload del token y la devuelve.