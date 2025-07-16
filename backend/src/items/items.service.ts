import {Injectable} from "@nestjs/common";

@Injectable()
export class ItemsService {
    private items: any[] = [];
    private nextId = 1;

    create(item: any) {
        const newItem = { ...item, id: this.nextId++ };
        this.items.push(newItem);
        return { message: 'Item saved!', item: newItem };
    }

    findByUser(userId: string) {
        return this.items.filter(item => item.userId === userId);
    }

    remove(id: number) {
        const index = this.items.findIndex(item => item.id === id);
        if (index !== -1) {
            const deleted = this.items.splice(index, 1)[0];
            return { success: true, deleted };
        } else {
            return { success: false, message: 'Item not found' };
        }
    }

    update(id: number, newName: string) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            item.itemName = newName;
            return { success: true, updated: item };
        } else {
            return { success: false, message: 'Item not found' };
        }
    }
}
