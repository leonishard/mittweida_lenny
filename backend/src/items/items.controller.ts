// src/items/items.controller.ts
import { Controller, Post, Body, Get, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';

@Controller('api/items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}

    @Post()
    create(@Body() createItemDto: CreateItemDto) {
        return this.itemsService.create(createItemDto);
    }

    @Get(':userId')
    findByUser(@Param('userId') userId: string) {
        return this.itemsService.findByUser(userId);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.itemsService.remove(id);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateData: { itemName: string }) {
        return this.itemsService.update(id, updateData.itemName);
    }
}
