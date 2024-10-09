import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { BikesService } from '../services/bikes.service';
import { CreateBikeDto } from '../dto/create-bike.dto';
import { UpdateBikeDto } from '../dto/update-bike.dto';
import { Bike } from '../entities/bike.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('bikes')
@Controller('bikes')
export class BikesController {
  constructor(private readonly bikesService: BikesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all bikes' }) // Describes the operation in Swagger
  @ApiResponse({ status: 200, description: 'List of bikes', type: [Bike] }) // Returns a list of bikes
  async findAll(): Promise<Bike[]> {
    return this.bikesService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new bike' }) // Describes the operation to create a bike
  @ApiResponse({ status: 201, description: 'The bike has been successfully created.', type: Bike }) // Response after successful creation
  @ApiResponse({ status: 400, description: 'Bad Request' }) // When validation fails or data is incorrect
  async create(@Body() createBikeDto: CreateBikeDto): Promise<Bike> {
    return this.bikesService.create(createBikeDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing bike' }) // Operation to update a bike
  @ApiResponse({ status: 200, description: 'The bike has been successfully updated.', type: Bike }) // Response on successful update
  @ApiResponse({ status: 404, description: 'Bike not found' }) // If the bike to update doesn't exist
  async update(@Param('id') id: string, @Body() updateBikeDto: UpdateBikeDto): Promise<Bike> {
    return this.bikesService.update(id, updateBikeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a bike' }) // Operation to delete a bike
  @ApiResponse({ status: 200, description: 'The bike has been successfully deleted.' }) // Response after deletion
  @ApiResponse({ status: 404, description: 'Bike not found' }) // If the bike doesn't exist
  async remove(@Param('id') id: string): Promise<void> {
    return this.bikesService.remove(id);
  }
}
