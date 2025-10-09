/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateResourceDto, UpdateResourceDto } from './dto/resource.dto';

@Injectable()
export class ResourcesService {
  private resources = [{ id: 1, name: 'CPU', description: 'Processing unit' }];

  getAll(_status?: string) {
    return this.resources;
  }

  getOne(id: number) {
    const resource = this.resources.find((r) => r.id === id);
    if (!resource) throw new NotFoundException('Resource not found');
    return resource;
  }

  create(dto: CreateResourceDto) {
    const newRes = {
      id: Date.now(),
      name: dto.name,
      description: dto.description ?? '',
    };
    this.resources.push(newRes);
    return newRes;
  }

  update(id: number, dto: UpdateResourceDto) {
    const index = this.resources.findIndex((r) => r.id === id);
    if (index === -1) throw new NotFoundException('Resource not found');
    this.resources[index] = { ...this.resources[index], ...dto };
    return this.resources[index];
  }

  remove(id: number) {
    this.resources = this.resources.filter((r) => r.id !== id);
    return { deleted: true };
  }
}
