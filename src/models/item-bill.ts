import { Product } from './product';

export class ItemBill {
    private product: Product;
    private cantity: number = 1;
    private amount: number;

    public calcAmount(): number  {
        return this.cantity * this.product.getPrice();
    }
}
