import { ItemBill } from './item-bill';
import Client from './client';

export class Bill {
    id: number;
    description: string;
    observation: string;
    items: Array<ItemBill> = [];
    total: number;
    createAt: string;
    client: Client;


    calculateGrantTotal(): number{
        this.total = 0;
        this.items.forEach((item: ItemBill) => {
            this.total = this.total + item.calcAmount();
        });
        return this.total;
    }
    
}
