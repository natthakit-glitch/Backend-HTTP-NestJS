
import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { ShippingService } from './shipping.service.js';

@Controller('shipping')
export class ShippingController {
  constructor(
    private readonly shippingService: ShippingService,
  ) {}

  @Get()
  calculate(
    @Query('weight') weight: string,
    @Query('zone') zone: string,
  ) {
    if (weight === undefined || zone === undefined) {
      throw new BadRequestException(
        'weight and zone are required',
      );
    }

    return this.shippingService.calculate(
      Number(weight),
      zone,
    );
  }
}
