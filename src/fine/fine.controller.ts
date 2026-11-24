
import {
  Controller,
  Get,
  Query,
  BadRequestException,
} from '@nestjs/common';

import { FineService } from './fine.service.js';

@Controller('fine')
export class FineController {
  constructor(private readonly fineService: FineService) {}

  @Get()
  calculateFine(
    @Query('days') days: string,
    @Query('type') type: string,
  ) {
    if (
      days === undefined ||
      days.trim() === '' ||
      type === undefined ||
      type.trim() === ''
    ) {
      throw new BadRequestException();
    }

    const numberOfDays = Number(days);

    if (!Number.isInteger(numberOfDays)) {
      throw new BadRequestException();
    }

    return this.fineService.calculateFine(numberOfDays, type);
  }
}
