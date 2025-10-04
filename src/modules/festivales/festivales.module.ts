import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FestivalesService } from './festivales.service';
import { FestivalesController } from './festivales.controller';
import { Festival, FestivalSchema } from 'src/entities/festival-premio.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Festival.name, schema: FestivalSchema }
    ])
  ],
  controllers: [FestivalesController],
  providers: [FestivalesService],
  exports: [FestivalesService]
})
export class FestivalesModule {}