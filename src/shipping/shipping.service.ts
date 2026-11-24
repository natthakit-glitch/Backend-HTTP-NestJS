
import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ShippingService {
  calculate(weight: number, zone: string) {

    if (!Number.isFinite(weight) || weight <= 0) {
      throw new BadRequestException('Invalid weight');
    }

    const zoneFees: Record<string, number> = {
      bangkok: 0,
      north: 10,
      south: 25,
    };

    if (!Object.prototype.hasOwnProperty.call(zoneFees, zone)) {
      throw new BadRequestException('Invalid zone');
    }

    const baseFee =
      weight <= 1
        ? 50
        : 50 + Math.ceil(weight - 1) * 18;

    const zoneFee = zoneFees[zone];

    const total = baseFee + zoneFee;

    return {
      weight,
      zone,
      baseFee,
      zoneFee,
      total,
    };
  }
}
