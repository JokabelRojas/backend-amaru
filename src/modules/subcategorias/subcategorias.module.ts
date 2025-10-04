import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubcategoriasService } from './subcategorias.service';
import { SubcategoriasController } from './subcategorias.controller';
import { Subcategoria, SubcategoriaSchema } from 'src/entities/subcategoria.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Subcategoria.name, schema: SubcategoriaSchema }
    ])
  ],
  controllers: [SubcategoriasController],
  providers: [SubcategoriasService],
  exports: [SubcategoriasService]
})
export class SubcategoriasModule {}