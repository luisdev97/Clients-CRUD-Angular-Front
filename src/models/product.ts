export class Product {
    private _id: number;
    private _name: string;
    private _quantity: number; 
    private _price: number;

    public get id(){
        return this._id;
    }

    public get name(){
        return this._name;
    }

    public get quantity(){
        return this._quantity;
    }

    public get price(){
        return this._price;
    }

    public set name(name: string){
        this._name = name;
    }

    public set quantity(quantity: number){
        this._name = name;
    }

    public set price(price: number){
        this._price = price;
    }
}
