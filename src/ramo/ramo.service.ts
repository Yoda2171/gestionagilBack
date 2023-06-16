import { Injectable } from '@nestjs/common';
import { CreateRamoDto } from './dto/create-ramo.dto';
import { UpdateRamoDto } from './dto/update-ramo.dto';
import { Ramo } from './entities/ramo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RamoService {

  constructor(
    @InjectRepository(Ramo)
    private ramoRepository:Repository<Ramo>
  ){}

  create(createRamoDto: CreateRamoDto) {
    const newRamo = this.ramoRepository.create(createRamoDto);
    return this.ramoRepository.save(newRamo);
  }

  findAll() {
    return this.ramoRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} ramo`;
  }

  update(id: number, updateRamoDto: UpdateRamoDto) {
    return `This action updates a #${id} ramo`;
  }

  remove(id: number) {
    return `This action removes a #${id} ramo`;
  }
}
