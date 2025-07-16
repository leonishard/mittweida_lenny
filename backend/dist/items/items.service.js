"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsService = void 0;
const common_1 = require("@nestjs/common");
let ItemsService = class ItemsService {
    items = [];
    nextId = 1;
    create(item) {
        const newItem = { ...item, id: this.nextId++ };
        this.items.push(newItem);
        return { message: 'Item saved!', item: newItem };
    }
    findByUser(userId) {
        return this.items.filter(item => item.userId === userId);
    }
    remove(id) {
        const index = this.items.findIndex(item => item.id === id);
        if (index !== -1) {
            const deleted = this.items.splice(index, 1)[0];
            return { success: true, deleted };
        }
        else {
            return { success: false, message: 'Item not found' };
        }
    }
    update(id, newName) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            item.itemName = newName;
            return { success: true, updated: item };
        }
        else {
            return { success: false, message: 'Item not found' };
        }
    }
};
exports.ItemsService = ItemsService;
exports.ItemsService = ItemsService = __decorate([
    (0, common_1.Injectable)()
], ItemsService);
//# sourceMappingURL=items.service.js.map