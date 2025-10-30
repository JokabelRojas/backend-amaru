import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Rol } from '../../entities/rol.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Rol.name) private rolModel: Model<Rol>, 
  ) {}   // Inyectar el modelo de Rol de Mongoose

  async create(createRolDto: any): Promise<Rol> {
    const createdRol = new this.rolModel(createRolDto);
    return createdRol.save();
  } // El método create maneja la creación de un nuevo rol

  async findAll(): Promise<Rol[]> {
    return this.rolModel.find().exec();
  } // El método findAll retorna todos los roles

  async findOne(id: string): Promise<Rol> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('ID de rol no válido'); // Validar el formato del ID
    }

    const rol = await this.rolModel.findById(id).exec(); // Buscar el rol por ID
    if (!rol) {
      throw new NotFoundException('Rol no encontrado'); // Manejar el error si no se encuentra el rol
    }
    return rol;
  } // El método findOne retorna un rol específico por su ID

  async findByName(nombre: string): Promise<Rol | null> {
    return this.rolModel.findOne({ nombre }).exec();
  } // El método findByName busca un rol por su nombre

  async update(id: string, updateRolDto: any): Promise<Rol> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('ID de rol no válido');
    }  // Validar el formato del ID

    const rol = await this.rolModel //  Actualizar el rol por ID
      .findByIdAndUpdate(id, updateRolDto, { new: true }) // Retornar el documento actualizado
      .exec();
    
    if (!rol) {
      throw new NotFoundException('Rol no encontrado');
    } // Manejar el error si no se encuentra el rol
    return rol;
  } // El método update maneja la actualización de un rol

  async remove(id: string): Promise<Rol> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('ID de rol no válido');
    } // Validar el formato del ID

    const rol = await this.rolModel.findByIdAndDelete(id).exec(); // Eliminar el rol por ID
    if (!rol) {
      throw new NotFoundException('Rol no encontrado');
    } // Manejar el error si no se encuentra el rol
    return rol;
  } // El método remove maneja la eliminación de un rol
}