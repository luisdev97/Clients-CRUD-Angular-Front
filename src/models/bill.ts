import { ItemBill } from './item-bill';
import Client from './client';

export class Bill {
    private _id: number;
    private _description: string;
    private observation: string;
    private items: Array<ItemBill> = [];
    private total: number;
    private createAt: string;
    private client: Client;

    public get description(): string{
        return this._description;
    }

    public get id(): number{
        return this._id;
    }
}
