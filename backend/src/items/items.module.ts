// src/items/items.module.ts
import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

@Module({
  controllers: [ItemsController], // ✅ must include controller
  providers: [ItemsService],
  exports: [ItemsService],
})
export class ItemsModule {}
