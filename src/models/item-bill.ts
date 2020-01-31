import { Product } from './product';

export class ItemBill {
    private _product: Product;
    private _cantity: number = 1;
    private _amount: number;

    public get product(){
        return this._product;
    }

    public set product(product: Product){
        this._product = product;
    }

    public get cantity(){
        return this._cantity;
    }

    public calcAmount(): number  {
        return this._cantity * this._product.price;
    }
}
