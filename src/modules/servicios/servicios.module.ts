import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiciosService } from './servicios.service';
import { ServiciosController } from './servicios.controller';
import { Servicio, ServicioSchema } from 'src/entities/servicio.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Servicio.name, schema: ServicioSchema }
    ])
  ],
  controllers: [ServiciosController],
  providers: [ServiciosService],
  exports: [ServiciosService]
})
export class ServiciosModule {}