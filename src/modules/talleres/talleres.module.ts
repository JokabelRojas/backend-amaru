import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TalleresService } from './talleres.service';
import { TalleresController } from './talleres.controller';
import { Taller, TallerSchema } from 'src/entities/taller.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Taller.name, schema: TallerSchema }
    ])
  ],
  controllers: [TalleresController],
  providers: [TalleresService],
  exports: [TalleresService]
})
export class TalleresModule {}