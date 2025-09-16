import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Usuario, UsuarioDocument } from '../../entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name) private usuarioModel: Model<UsuarioDocument>,
  ) {}

  async create(createUsuarioDto: any): Promise<UsuarioDocument> {
    const createdUsuario = new this.usuarioModel(createUsuarioDto);
    return createdUsuario.save();
  }

  async findAll(): Promise<UsuarioDocument[]> {
    return this.usuarioModel.find().populate('id_rol').exec();
  }

  async findOne(id: string): Promise<UsuarioDocument> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('ID de usuario no válido');
    }

    const usuario = await this.usuarioModel.findById(id).populate('id_rol').exec();
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return usuario;
  }

  async findByEmail(email: string): Promise<UsuarioDocument | null> {
    return this.usuarioModel.findOne({ email }).populate('id_rol').exec();
  }

  async update(id: string, updateUsuarioDto: any): Promise<UsuarioDocument> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('ID de usuario no válido');
    }

    const usuario = await this.usuarioModel
      .findByIdAndUpdate(id, updateUsuarioDto, { new: true })
      .populate('id_rol')
      .exec();
    
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return usuario;
  }

  async remove(id: string): Promise<UsuarioDocument> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('ID de usuario no válido');
    }

    const usuario = await this.usuarioModel.findByIdAndDelete(id).exec();
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return usuario;
  }

  async count(): Promise<number> {
    return this.usuarioModel.countDocuments().exec();
  }
}