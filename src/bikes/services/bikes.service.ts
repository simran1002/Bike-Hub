import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bike } from '../entities/bike.entity';
import { CreateBikeDto } from '../dto/create-bike.dto';
import { UpdateBikeDto } from '../dto/update-bike.dto';

@Injectable()
export class BikesService {
  constructor(
    @InjectRepository(Bike)
    private readonly bikeRepository: Repository<Bike>,
  ) {}

  async findAll(): Promise<Bike[]> {
    return await this.bikeRepository.find();
  }

  async create(createBikeDto: CreateBikeDto): Promise<Bike> {
    const bike = this.bikeRepository.create(createBikeDto);
    return await this.bikeRepository.save(bike);
  }

  async update(id: string, updateBikeDto: UpdateBikeDto): Promise<Bike> {
    const bike = await this.bikeRepository.findOneBy({ id });
    if (!bike) {
      throw new NotFoundException(`Bike with ID ${id} not found`);
    }
    Object.assign(bike, updateBikeDto);
    return await this.bikeRepository.save(bike);
  }

  async remove(id: string): Promise<void> {
    const bike = await this.bikeRepository.findOneBy({ id });
    if (!bike) {
      throw new NotFoundException(`Bike with ID ${id} not found`);
    }
    await this.bikeRepository.remove(bike);
  }
}
