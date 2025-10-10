/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { ResourcesService } from './resources.service';
import {
  CreateResourceDto,
  FilterResourceDto,
  UpdateResourceDto,
} from './dto/resource.dto';

@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  // this is return all the resources
  // only return resources with the specified status if provided and status is nullable 
  @Get()
  getAll(@Query('status') status?: string) {
    try {
      return this.resourcesService.getAll(status);
    } catch (e) {
      console.log('Error:', e);
    }
  }

  // 👉 GET /resources/:id
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.resourcesService.getOne(+id);
  }

  // 👉 POST /resources
  @Post()
  create(@Body() dto: CreateResourceDto) {
    return this.resourcesService.create(dto);
  }

  // 👉 PUT /resources/:id
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateResourceDto) {
    return this.resourcesService.update(+id, dto);
  }

  // 👉 DELETE /resources/:id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resourcesService.remove(+id);
  }

  // 1️⃣ Multiple Path Params
  // GET /accounts/:accountId/projects/:projectId/resources/:resourceId
  @Get('accounts/:accountId/projects/:projectId/resources/:resourceId')
  getResourceByProject(
    @Param('accountId') accountId: string,
    @Param('projectId') projectId: string,
    @Param('resourceId') resourceId: string,
  ) {
    return this.resourcesService.getResourceByProject(
      +accountId,
      +projectId,
      +resourceId,
    );
  }

  // 2️⃣ Multiple Query Params
  // GET /resources/filter?status=active&type=internal&limit=5&page=1
  @Get('filter')
  getFilteredResources(@Query() filter: FilterResourceDto) {
    return this.resourcesService.getFilteredResources(filter);
  }

  // 3️⃣ Combination: Path + Query
  // GET /projects/:projectId/resources?status=active&type=external
  @Get('projects/:projectId/resources')
  getResourcesByProject(
    @Param('projectId') projectId: string,
    @Query('status') status?: string,
    @Query('type') type?: string,
  ) {
    return this.resourcesService.getResourcesByProject(+projectId, {
      status,
      type,
    });
  }

  // 4️⃣ Path + Body (POST)
  // POST /projects/:projectId/resources/:resourceId/assign
  @Post('projects/:projectId/resources/:resourceId/assign')
  assignResource(
    @Param('projectId') projectId: string,
    @Param('resourceId') resourceId: string,
    @Body() body: { assignedTo: string; role: string },
  ) {
    return this.resourcesService.assignResource(+projectId, +resourceId, body);
  }

  // 5️⃣ Range Filter Example
  // GET /resources/range?startDate=2025-01-01&endDate=2025-01-31&status=active
  @Get('range')
  getByDateRange(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('status') status?: string,
  ) {
    return this.resourcesService.getByDateRange(startDate, endDate, status);
  }
}
