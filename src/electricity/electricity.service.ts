
import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ElectricityService {
  calculateElectricity(units: number, type: string) {
    // ตรวจสอบจำนวนหน่วย
    if (!Number.isInteger(units) || units < 0) {
      throw new BadRequestException('units ต้องเป็นจำนวนเต็มตั้งแต่ 0 ขึ้นไป');
    }

    // กำหนดค่าบริการรายเดือน
    const serviceRates: Record<string, number> = {
      residential: 40,
      business: 90,
    };

    // ตรวจสอบประเภทผู้ใช้ไฟฟ้า
    if (!Object.prototype.hasOwnProperty.call(serviceRates, type)) {
      throw new BadRequestException('type ไม่ถูกต้อง');
    }

    // คำนวณค่าไฟฟ้าแบบขั้นบันได
    let energyCharge = 0;

    if (units <= 150) {
      energyCharge = units * 3;
    } else {
      energyCharge = (150 * 3) + ((units - 150) * 4);
    }

    // คำนวณค่าบริการ
    const serviceCharge = serviceRates[type];

    // คำนวณยอดรวม
    const total = energyCharge + serviceCharge;

    return {
      units,
      type,
      energyCharge,
      serviceCharge,
      total,
    };
  }
}
