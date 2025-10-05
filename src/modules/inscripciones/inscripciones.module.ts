import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InscripcionesService } from './inscripciones.service';
import { InscripcionesController } from './inscripciones.controller';
import { Inscripcion, InscripcionSchema } from 'src/entities/inscripcion.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Inscripcion.name, schema: InscripcionSchema }
    ])
  ],
  controllers: [InscripcionesController],
  providers: [InscripcionesService],
  exports: [InscripcionesService]
})
export class InscripcionesModule {}