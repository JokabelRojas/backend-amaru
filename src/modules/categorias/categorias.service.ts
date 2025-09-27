import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoriaDto } from './dto/create-categorias.dto';
import { UpdateCategoriaDto } from './dto/update-categorias.dto';
import { Categoria } from 'src/entities/categoria.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectModel(Categoria.name) private categoriaModel: Model<Categoria>,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    const existingCategoria = await this.categoriaModel.findOne({
      nombre: createCategoriaDto.nombre,
    });

    if (existingCategoria) {
      throw new ConflictException('Ya existe una categoría con este nombre');
    }

    const categoriaData = {
      ...createCategoriaDto,
      createdAt: createCategoriaDto.createdAt || new Date(),
      updatedAt: createCategoriaDto.updatedAt || new Date(),
      estado: createCategoriaDto.estado || 'activo',
    };

    const createdCategoria = new this.categoriaModel(categoriaData);
    return createdCategoria.save();
  }

  async findAll(): Promise<Categoria[]> {
    return this.categoriaModel.find().sort({ createdAt: -1 }).exec();
  }

  async findActive(): Promise<Categoria[]> {
    return this.categoriaModel.find({ estado: 'activo' }).sort({ createdAt: -1 }).exec();
  }

  async findByTipo(tipo: string): Promise<Categoria[]> {
    return this.categoriaModel.find({ tipo, estado: 'activo' }).sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Categoria> {
    const categoria = await this.categoriaModel.findById(id).exec();
    if (!categoria) {
      throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
    }
    return categoria;
  }

  async update(id: string, updateCategoriaDto: UpdateCategoriaDto): Promise<Categoria> {
    if (updateCategoriaDto.nombre) {
      const existingCategoria = await this.categoriaModel.findOne({
        nombre: updateCategoriaDto.nombre,
        _id: { $ne: id },
      });

      if (existingCategoria) {
        throw new ConflictException('Ya existe otra categoría con este nombre');
      }
    }

    const updateData = {
      ...updateCategoriaDto,
      updatedAt: updateCategoriaDto.updatedAt || new Date(),
    };

    const updatedCategoria = await this.categoriaModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    if (!updatedCategoria) {
      throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
    }

    return updatedCategoria;
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.categoriaModel.findByIdAndDelete(id).exec();
    
    if (!result) {
      throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
    }

    return { message: 'Categoría eliminada correctamente' };
  }

  async softDelete(id: string): Promise<Categoria> {
    const categoria = await this.categoriaModel
      .findByIdAndUpdate(
        id, 
        { 
          estado: 'inactivo',
          updatedAt: new Date()
        }, 
        { new: true }
      )
      .exec();

    if (!categoria) {
      throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
    }

    return categoria;
  }

  async activate(id: string): Promise<Categoria> {
    const categoria = await this.categoriaModel
      .findByIdAndUpdate(
        id, 
        { 
          estado: 'activo',
          updatedAt: new Date()
        }, 
        { new: true }
      )
      .exec();

    if (!categoria) {
      throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
    }

    return categoria;
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Categoria[]> {
    return this.categoriaModel.find({
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    }).sort({ createdAt: -1 }).exec();
  }
}