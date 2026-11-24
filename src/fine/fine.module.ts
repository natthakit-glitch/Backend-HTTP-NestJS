
import { Module } from '@nestjs/common';
import { FineController } from './fine.controller.js';
import { FineService } from './fine.service.js';

@Module({
  controllers: [FineController],
  providers: [FineService],
})
export class FineModule {}
