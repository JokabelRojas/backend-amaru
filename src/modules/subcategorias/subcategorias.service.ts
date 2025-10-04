import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSubcategoriaDto } from './dto/create-subcategorias.dto';
import { UpdateSubcategoriaDto } from './dto/update-subcategorias.dto';
import { Subcategoria } from 'src/entities/subcategoria.entity';

@Injectable()
export class SubcategoriasService {
  constructor(
    @InjectModel(Subcategoria.name) 
    private subcategoriaModel: Model<Subcategoria>,
  ) {}

async create(createSubcategoriaDto: CreateSubcategoriaDto): Promise<Subcategoria> {
  try {
    const createdSubcategoria = new this.subcategoriaModel(createSubcategoriaDto);
    const savedSubcategoria = await createdSubcategoria.save();
    return await savedSubcategoria.populate('id_categoria');
  } catch (error) {
    if (error.name === 'ValidationError') {
      throw new BadRequestException('Datos de subcategoría inválidos');
    }
    throw error;
  }
}

  async findAll(): Promise<Subcategoria[]> {
    return this.subcategoriaModel
      .find()
      .populate('id_categoria')
      .exec();
  }

  async findOne(id: string): Promise<Subcategoria> {
    const subcategoria = await this.subcategoriaModel
      .findById(id)
      .populate('id_categoria')
      .exec();
    
    if (!subcategoria) {
      throw new NotFoundException(`Subcategoría con ID ${id} no encontrada`);
    }
    
    return subcategoria;
  }

  async update(id: string, updateSubcategoriaDto: UpdateSubcategoriaDto): Promise<Subcategoria> {
    const existingSubcategoria = await this.subcategoriaModel
      .findByIdAndUpdate(id, updateSubcategoriaDto, { new: true })
      .exec();
    
    if (!existingSubcategoria) {
      throw new NotFoundException(`Subcategoría con ID ${id} no encontrada`);
    }
    
    return existingSubcategoria;
  }

  async remove(id: string): Promise<Subcategoria> {
    const deletedSubcategoria = await this.subcategoriaModel.findByIdAndDelete(id);
    
    if (!deletedSubcategoria) {
      throw new NotFoundException(`Subcategoría con ID ${id} no encontrada`);
    }
    
    return deletedSubcategoria;
  }

  async findByCategoria(idCategoria: string): Promise<Subcategoria[]> {
    return this.subcategoriaModel
      .find({ id_categoria: idCategoria })
      .populate('id_categoria')
      .exec();
  }

  async cambiarEstado(id: string, estado: string): Promise<Subcategoria> {
    const subcategoria = await this.subcategoriaModel
      .findByIdAndUpdate(id, { estado }, { new: true })
      .exec();
    
    if (!subcategoria) {
      throw new NotFoundException(`Subcategoría con ID ${id} no encontrada`);
    }
    
    return subcategoria;
  }
}