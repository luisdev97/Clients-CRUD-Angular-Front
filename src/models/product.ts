export class Product {
    private id: number;
    private _name: string;
    private _cantity: number; 
    private _price: number;

    public get name(){
        return this._name;
    }

    public get cantity(){
        return this._cantity;
    }

    public get price(){
        return this._price;
    }

    public set name(name: string){
        this._name = name;
    }

    public set cantity(cantity: number){
        this._name = name;
    }

    public set price(price: number){
        this._price = price;
    }
}
