/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from 'src/dto/user.dto';
import { User } from 'src/schema/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('users')
    private readonly userModel: Model<User>,
  ) {}

  // 🟢 Create a new user
  async create(data: CreateUserDto): Promise<User> {
    return await this.userModel.create(data);
  }

  // 🟢 Basic findAll with aggregation example (match by ID)
  async findAll(): Promise<User[]> {
    const db = this.userModel.db.useDb('nest_demo1');
    const result = await db
      .collection('users')
      .aggregate([
        {
          $match: {
            _id: new Types.ObjectId('68f9a5810cbbe062ee8a372e'),
          },
        },
      ])
      .toArray();

    return result as User[];
  }

  // 🟠 Find by ID (simple Mongoose query)
  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // 🟣 Update user details
  async update(id: string, data: Partial<User>): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // 🔴 Delete user
  async remove(id: string): Promise<User> {
    const user = await this.userModel.findByIdAndDelete(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // 🧠 1️⃣ Aggregate: Filter users by age > 25 and project selected fields
  async findAdults(): Promise<User[]> {
    return this.userModel
      .aggregate([
        { $match: { age: { $gte: 25 } } },
        {
          $project: {
            name: 1,
            email: 1,
            age: 1,
            _id: 0,
          },
        },
      ])
      .exec();
  }

  // 🧠 2️⃣ Aggregate: Group users by "city" and count
  async groupByCity(): Promise<any[]> {
    return this.userModel
      .aggregate([
        { $group: { _id: '$age', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ])
      .exec();
  }

  // 🧠 3️⃣ Aggregate: Lookup (join) users with another collection (e.g. "orders")
  async getUsersWithOrders(): Promise<any[]> {
    return this.userModel
      .aggregate([
        {
          $lookup: {
            from: 'orders', // name of the target collection
            localField: '_id',
            foreignField: 'userId',
            as: 'orders',
          },
        },
        { $unwind: { path: '$orders', preserveNullAndEmptyArrays: true } },
        {
          $project: {
            name: 1,
            email: 1,
            'orders._id': 1,
            'orders.amount': 1,
            'orders.status': 1,
          },
        },
      ])
      .exec();
  }

  // 🧠 4️⃣ Aggregate: Pagination (skip + limit)
  async getPaginatedUsers(page = 3, limit = 10): Promise<any[]> {
    const skip = (page - 1) * limit;
    return this.userModel
      .aggregate([
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },
        {
          $project: {
            name: 1,
            email: 1,
            createdAt: 1,
          },
        },
      ])
      .exec();
  }

  // 🧠 5️⃣ Aggregate: Average user age by city
  async averageAgeByCity(): Promise<any[]> {
    return this.userModel
      .aggregate([
        { $group: { _id: '$city', avgAge: { $avg: '$age' } } },
        { $sort: { avgAge: -1 } },
      ])
      .exec();
  }
}
