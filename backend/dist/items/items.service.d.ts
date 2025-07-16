export declare class ItemsService {
    private items;
    private nextId;
    create(item: any): {
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
    update(id: number, newName: string): {
        success: boolean;
        updated: any;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        updated?: undefined;
    };
}
