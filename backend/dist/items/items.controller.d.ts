import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
export declare class ItemsController {
    private readonly itemsService;
    constructor(itemsService: ItemsService);
    create(createItemDto: CreateItemDto): {
        message: string;
        item: any;
    };
    findByUser(userId: string): any[];
    remove(id: number): {
        success: boolean;
        deleted: any;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        deleted?: undefined;
    };
    update(id: number, updateData: {
        itemName: string;
    }): {
        success: boolean;
        updated: any;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        updated?: undefined;
    };
}
