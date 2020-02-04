import { Product } from './product';

export class ItemBill {
     product: Product;
     quantity: number = 1;  

    public calcAmount(): number  {
        return this.quantity * this.product.price;
    }
}
