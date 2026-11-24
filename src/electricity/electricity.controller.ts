
import {
  Controller,
  Get,
  Query,
  BadRequestException,
} from '@nestjs/common';

import { ElectricityService } from './electricity.service.js';

@Controller('electricity')
export class ElectricityController {
  constructor(
    private readonly electricityService: ElectricityService,
  ) {}

  @Get()
  calculateElectricity(
    @Query('units') units: string,
    @Query('type') type: string,
  ) {
    // ตรวจสอบว่ามีการส่งค่ามาหรือไม่
    if (
      units === undefined ||
      units.trim() === '' ||
      type === undefined ||
      type.trim() === ''
    ) {
      throw new BadRequestException('กรุณาระบุ units และ type');
    }

    // แปลงข้อความเป็นตัวเลข
    const numberOfUnits = Number(units);

    // ตรวจสอบข้อมูล
    if (!Number.isInteger(numberOfUnits) || numberOfUnits < 0) {
      throw new BadRequestException('units ต้องเป็นจำนวนเต็มตั้งแต่ 0 ขึ้นไป');
    }

    // ส่งข้อมูลไปคำนวณใน Service
    return this.electricityService.calculateElectricity(
      numberOfUnits,
      type,
    );
  }
}
