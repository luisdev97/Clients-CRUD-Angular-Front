import { ItemBill } from './item-bill';
import Client from './client';

export class Bill {
    private id: number;
    private description: string;
    private observation: string;
    private items: Array<ItemBill> = [];
    private total: number;
    private createAt: string;
    private client: Client;
}
