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
import { CreateResourceDto, UpdateResourceDto } from './dto/resource.dto';

@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  // 👉 GET /resources
  @Get()
  getAll(@Query('status') status?: string) {
    return this.resourcesService.getAll(status);
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
}
