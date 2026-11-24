
import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class FineService {
  calculateFine(days: number, type: string) {
    // ตรวจสอบจำนวนวัน
    if (!Number.isInteger(days) || days < 0) {
      throw new BadRequestException();
    }

    // กำหนดอัตราค่าปรับ
    const rates: Record<string, number> = {
      general: 5,
      reserve: 20,
      reference: 50,
    };

    // ตรวจสอบประเภทหนังสือ
    if (!Object.prototype.hasOwnProperty.call(rates, type)) {
      throw new BadRequestException();
    }

    // คำนวณค่าปรับ
    const rate = rates[type];
    const chargeableDays = Math.max(0, days - 3);

    // ค่าปรับสูงสุด 500 บาท
    const total = Math.min(chargeableDays * rate, 500);

    return {
      days,
      type,
      chargeableDays,
      rate,
      total,
    };
  }
}
