import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Rol } from '../../entities/rol.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Rol.name) private rolModel: Model<Rol>,
  ) {}

  async create(createRolDto: any): Promise<Rol> {
    const createdRol = new this.rolModel(createRolDto);
    return createdRol.save();
  }

  async findAll(): Promise<Rol[]> {
    return this.rolModel.find().exec();
  }

  async findOne(id: string): Promise<Rol> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('ID de rol no válido');
    }

    const rol = await this.rolModel.findById(id).exec();
    if (!rol) {
      throw new NotFoundException('Rol no encontrado');
    }
    return rol;
  }

  async findByName(nombre: string): Promise<Rol | null> {
    return this.rolModel.findOne({ nombre }).exec();
  }

  async update(id: string, updateRolDto: any): Promise<Rol> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('ID de rol no válido');
    }

    const rol = await this.rolModel
      .findByIdAndUpdate(id, updateRolDto, { new: true })
      .exec();
    
    if (!rol) {
      throw new NotFoundException('Rol no encontrado');
    }
    return rol;
  }

  async remove(id: string): Promise<Rol> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('ID de rol no válido');
    }

    const rol = await this.rolModel.findByIdAndDelete(id).exec();
    if (!rol) {
      throw new NotFoundException('Rol no encontrado');
    }
    return rol;
  }
}