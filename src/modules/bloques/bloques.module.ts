import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BloquesService } from './bloques.service';
import { BloquesController } from './bloques.controller';
import { Bloque, BloqueSchema } from 'src/entities/bloque.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Bloque.name, schema: BloqueSchema }
    ])
  ],
  controllers: [BloquesController],
  providers: [BloquesService],
  exports: [BloquesService]
})
export class BloquesModule {}