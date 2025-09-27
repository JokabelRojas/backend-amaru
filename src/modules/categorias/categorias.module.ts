import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriaController } from './categorias.controller';
import { CategoriaService } from './categorias.service';
import { Categoria, CategoriaSchema } from 'src/entities/categoria.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { 
        name: Categoria.name, 
        schema: CategoriaSchema 
      }
    ]),
  ],
  controllers: [CategoriaController],
  providers: [CategoriaService],
  exports: [CategoriaService],
})
export class CategoriaModule {}