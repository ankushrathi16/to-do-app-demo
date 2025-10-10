/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateResourceDto,
  FilterResourceDto,
  UpdateResourceDto,
} from './dto/resource.dto';

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

  private resources1 = [
    { id: 1, name: 'John', type: 'internal', status: 'active', projectId: 10 },
    {
      id: 2,
      name: 'Emma',
      type: 'external',
      status: 'inactive',
      projectId: 10,
    },
    { id: 3, name: 'Mike', type: 'internal', status: 'active', projectId: 20 },
  ];

  // 1️⃣ Path params example
  getResourceByProject(
    accountId: number,
    projectId: number,
    resourceId: number,
  ) {
    return {
      message: 'Fetched resource by account + project + resource',
      accountId,
      projectId,
      resourceId,
    };
  }

  // 2️⃣ Query params example
  getFilteredResources(filter: FilterResourceDto) {
    const { status, type, limit = 10, page = 1 } = filter;

    const filtered = this.resources1.filter((r) => {
      return (!status || r.status === status) && (!type || r.type === type);
    });

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return {
      message: 'Filtered resources successfully',
      total: filtered.length,
      data: filtered.slice(startIndex, endIndex),
    };
  }

  // 3️⃣ Path + Query example
  getResourcesByProject(
    projectId: number,
    filter: { status?: string; type?: string },
  ) {
    const { status, type } = filter;
    const result = this.resources1.filter(
      (r) =>
        r.projectId === projectId &&
        (!status || r.status === status) &&
        (!type || r.type === type),
    );
    return {
      message: 'Resources for project with filters',
      projectId,
      count: result.length,
      data: result,
    };
  }

  // 4️⃣ Path + Body example
  assignResource(
    projectId: number,
    resourceId: number,
    body: { assignedTo: string; role: string },
  ) {
    return {
      message: 'Resource assigned successfully',
      projectId,
      resourceId,
      details: body,
    };
  }

  // 5️⃣ Range example
  getByDateRange(startDate: string, endDate: string, status?: string) {
    return {
      message: 'Fetched data in range',
      filters: { startDate, endDate, status },
    };
  }
}
