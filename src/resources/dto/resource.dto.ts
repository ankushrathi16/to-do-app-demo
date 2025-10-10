/* eslint-disable @typescript-eslint/no-unsafe-call */
// dto/create-resource.dto.ts
import { IsOptional, IsString } from 'class-validator';

export class CreateResourceDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateResourceDto {
  @IsOptional()
  @IsString()
  description?: string;
}

export class FilterResourceDto {
  status?: string;
  type?: string;
  limit?: number;
  page?: number;
}
