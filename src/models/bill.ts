import { ItemBill } from './item-bill';
import Client from './client';

export class Bill {
    private _id: number;
    private _description: string;
    private observation: string;
    private _items: Array<ItemBill> = [];
    private total: number;
    private createAt: string;
    private _client: Client;

    public get description(): string{
        return this._description;
    }

    public get id(): number{
        return this._id;
    }

    public get client():Client {
        return this._client;
    }

    public set client(client: Client){
        this._client = client;
    }

    public get items(): ItemBill[]{
        return this._items;
    }

    public set items(items: ItemBill[]){
        this._items = items;
    }
}
