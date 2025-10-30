import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { CreateBloqueDto } from './dto/create-bloques.dto';
import { UpdateBloqueDto } from './dto/update-bloques.dto';
import { Bloque } from 'src/entities/bloque.entity';

@Injectable()
export class BloquesService {
  constructor(
    @InjectModel(Bloque.name) private bloqueModel: Model<Bloque>,
  ) {}

  private validateMongoId(id: string): void {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`ID ${id} no es válido`);
    }
  }

  async create(createBloqueDto: CreateBloqueDto): Promise<Bloque> {
    try {
      if (new Date(createBloqueDto.fecha_fin) <= new Date(createBloqueDto.fecha_inicio)) {
        throw new BadRequestException('La fecha de fin debe ser posterior a la fecha de inicio');
      } // Validar que la fecha de fin sea posterior a la de inicio

      const bloqueData = {
        ...createBloqueDto,
        cupo_disponible: createBloqueDto.cupo_total
      }; // Establecer el cupo disponible igual al cupo total al crear el bloque

      const createdBloque = new this.bloqueModel(bloqueData); //  Crear una nueva instancia del modelo Bloque
      const savedBloque = await createdBloque.save(); // Guardar el bloque en la base de datos
      
      return await savedBloque.populate('id_taller'); // Retornar el bloque guardado con el taller poblado
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new BadRequestException('Datos del bloque inválidos');
      } // Manejar errores de validación de Mongoose
      throw error;
    }
  } // El método create maneja la creación de un nuevo bloque, validando las fechas y estableciendo 
  // el cupo disponible inicial.

  async findAll(): Promise<Bloque[]> {
    return this.bloqueModel.find().populate('id_taller').exec();
  } // El método findAll retorna todos los bloques con el taller poblado.

  async findOne(id: string): Promise<Bloque> {
    this.validateMongoId(id);
    const bloque = await this.bloqueModel.findById(id).populate('id_taller').exec();
    if (!bloque) throw new NotFoundException(`Bloque con ID ${id} no encontrado`);
    return bloque;
  } // El método findOne retorna un bloque específico por su ID, validando el ID y manejando 
  // el error si no se encuentra.

  async update(id: string, updateBloqueDto: UpdateBloqueDto): Promise<Bloque> {
    this.validateMongoId(id);
    
    const bloque = await this.bloqueModel.findById(id); // Buscar el bloque por ID
    if (!bloque) throw new NotFoundException(`Bloque con ID ${id} no encontrado`); // Validar que el bloque exista

    Object.assign(bloque, updateBloqueDto); // Actualizar los campos del bloque con los datos del DTO

    if (bloque.fecha_fin <= bloque.fecha_inicio) {
      throw new BadRequestException('La fecha de fin debe ser posterior a la fecha de inicio');
    } // Validar que la fecha de fin sea posterior a la de inicio

    if (updateBloqueDto.cupo_total !== undefined && updateBloqueDto.cupo_total !== bloque.cupo_total) {
      const diferencia = updateBloqueDto.cupo_total - bloque.cupo_total;
      bloque.cupo_disponible = Math.max(0, bloque.cupo_disponible + diferencia);
    } // Ajustar el cupo disponible si el cupo total cambia

    return await bloque.save();
  } // El método update actualiza un bloque existente, validando las fechas y ajustando

  async remove(id: string): Promise<Bloque> {
    this.validateMongoId(id);
    const deletedBloque = await this.bloqueModel.findByIdAndDelete(id);
    if (!deletedBloque) throw new NotFoundException(`Bloque con ID ${id} no encontrado`);
    return deletedBloque;
  } // El método remove elimina un bloque por su ID, validando el ID y manejando el error

  async findByTaller(idTaller: string): Promise<Bloque[]> {
    this.validateMongoId(idTaller);
    return this.bloqueModel.find({ id_taller: idTaller }).populate('id_taller').exec();
  } // El método findByTaller retorna todos los bloques asociados a un taller específico.

  async cambiarEstado(id: string, estado: string): Promise<Bloque> {
    this.validateMongoId(id);
    if (!['activo', 'inactivo'].includes(estado)) {
      throw new BadRequestException('El estado debe ser "activo" o "inactivo"');
    }
    const bloque = await this.bloqueModel.findByIdAndUpdate(id, { estado }, { new: true }).populate('id_taller');
    if (!bloque) throw new NotFoundException(`Bloque con ID ${id} no encontrado`);
    return bloque;
  } // El método cambiarEstado actualiza el estado de un bloque, validando el ID y el nuevo estado.

  async actualizarCupo(id: string, cuposReservados: number): Promise<Bloque> {
    this.validateMongoId(id);
    const bloque = await this.bloqueModel.findById(id); // Buscar el bloque por ID
    if (!bloque) throw new NotFoundException(`Bloque con ID ${id} no encontrado`); // Validar que el bloque exista

    const nuevoCupoDisponible = bloque.cupo_disponible - cuposReservados; // Calcular el nuevo cupo disponible
    if (nuevoCupoDisponible < 0) throw new BadRequestException('No hay cupos disponibles suficientes'); // Validar que haya cupos disponibles suficientes

    bloque.cupo_disponible = nuevoCupoDisponible; // Actualizar el cupo disponible del bloque
    return await bloque.save();
  } // El método actualizarCupo ajusta el cupo disponible de un bloque cuando se realizan reservas,
}