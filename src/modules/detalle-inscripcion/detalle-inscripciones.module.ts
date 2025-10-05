import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DetalleInscripcionesService } from './detalle-inscripciones.service';
import { DetalleInscripcionesController } from './detalle-inscripciones.controller';
import { DetalleInscripcion, DetalleInscripcionSchema } from 'src/entities/detalle-inscripcion.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DetalleInscripcion.name, schema: DetalleInscripcionSchema }
    ])
  ],
  controllers: [DetalleInscripcionesController],
  providers: [DetalleInscripcionesService],
  exports: [DetalleInscripcionesService]
})
export class DetalleInscripcionesModule {}