import { Component, OnInit, EventEmitter } from '@angular/core';
import { Bill } from 'src/models/bill';
import { ClientService } from '../clients/client.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material';

import Client from 'src/models/client';
import { BillService } from './bill.service';
import { Product } from 'src/models/product';
import { ItemBill } from 'src/models/item-bill';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html'
})
export class BillsComponent implements OnInit {

  title: string = "New Bill";
  bill: Bill = new Bill();


  autoCompleteControl = new FormControl();
  products: string[] = ['Table', 'Chair', 'Lamp', 'Long Skate'];
  filteredProducts: Observable<Product[]>;

  constructor(private clientService: ClientService, private activatedRoute: ActivatedRoute, private billService: BillService) {

  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const clientId = +params.get('clientId');
      this.clientService.getClient(clientId).subscribe(res => {
        this.bill.client = res as Client;
      });
    });

    //Observable<String>
    this.filteredProducts = this.autoCompleteControl.valueChanges
      .pipe(
        map(value => typeof value === 'string' ? value : value.name),
        flatMap(value => value ? this._filter(value) : [])
      );
  }


  showName(product?: Product): string | undefined {
    return product ? product.name : undefined
  }


  private _filter(value: string): Observable<Product[]> {
    const filterValue = value.toLowerCase();
    return this.billService.filterProducts(filterValue);
  }


  selectProduct(event: MatAutocompleteSelectedEvent): void {
    const product = event.option.value as Product;

    if(this.itemExist(product.id)){
      this.incrementquantity(product.id);
    }else{
      this.addNewProduct(product);
    }

    this.autoCompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();
  }

  updatequantity(id: number, event: any): void {
    const quantity: number = event.target.value as number;

    if(quantity == 0 ){
      return this.deleteBill(id);
    }

    this.bill.items = this.bill.items.map((item: ItemBill) => {
      if (item.product.id === id) {
        item.quantity = quantity;
      }
      return item;
    });
  }

  itemExist(id: number): boolean{
    let exist = false;

    this.bill.items.forEach(item => {
      if(item.product.id === id){
        exist = true;
      }
    });
    return exist;
  }

  incrementquantity(id: number): void {

    this.bill.items = this.bill.items.map((item: ItemBill) => {
      if (item.product.id === id) {
        ++item.quantity;
      }
      return item;
    });

  }

  addNewProduct(product: Product){
    let newItem = new ItemBill();
    newItem.product = product;
    this.bill.items.push(newItem);
   
  }

  deleteBill(id: number): void{
    this.bill.items = this.bill.items.filter(item => item.product.id !== id);
  }




}
