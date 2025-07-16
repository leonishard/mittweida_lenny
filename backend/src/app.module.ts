// src/app.module.ts
import { Module } from '@nestjs/common';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [ItemsModule], // ✅ must be here
})
export class AppModule {}
