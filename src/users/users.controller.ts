import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../schema/user.schema';
import { CreateUserDto } from '../dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 🟢 Create a new user
  @Post()
  async create(@Body() data: CreateUserDto): Promise<User> {
    console.log('Creating user with data:', data);
    return this.usersService.create(data);
  }

  // 🟢 Get all users (currently has aggregation match example)
  @Get(':age')
  async findAll(@Param('age') age: string): Promise<User[]> {
    return this.usersService.findAll(age);
  }

  // // 🟠 Get user by ID
  // @Get(':id')
  // async findOne(@Param('id') id: string): Promise<User> {
  //   return this.usersService.findOne(id);
  // }

  // 🟣 Update user by ID
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<User>,
  ): Promise<User> {
    return this.usersService.update(id, data);
  }

  // 🔴 Delete user by ID
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<User> {
    return this.usersService.remove(id);
  }

  // 🧠 1️⃣ Aggregate - Get all adult users (age >= 25)
  @Get('aggregate/adults')
  async findAdults(): Promise<User[]> {
    return this.usersService.findAdults();
  }

  // 🧠 2️⃣ Aggregate - Group users by city
  @Get('aggregate/group-by-city')
  async groupByCity(): Promise<any[]> {
    return this.usersService.groupByCity();
  }

  // 🧠 3️⃣ Aggregate - Users with their orders (lookup example)
  @Get('aggregate/with-orders')
  async getUsersWithOrders(): Promise<any[]> {
    return this.usersService.getUsersWithOrders();
  }

  // 🧠 4️⃣ Aggregate - Paginated users (use query params)
  @Get('aggregate/paginated')
  async getPaginatedUsers(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ): Promise<any[]> {
    return this.usersService.getPaginatedUsers(Number(page), Number(limit));
  }

  // 🧠 5️⃣ Aggregate - Average age by city
  @Get('aggregate/average-age-by-city')
  async averageAgeByCity(): Promise<any[]> {
    return this.usersService.averageAgeByCity();
  }
}
