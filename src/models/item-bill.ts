import { Product } from './product';

export class ItemBill {
    private _product: Product;
    private _quantity: number = 1;
    private _amount: number;

    public get product(){
        return this._product;
    }

    public set product(product: Product){
        this._product = product;
    }

    public get quantity(){
        return this._quantity;
    }

    public set quantity(quantity: number){
        this._quantity = quantity;
    }

    public calcAmount(): number  {
        return this._quantity * this._product.price;
    }
}
