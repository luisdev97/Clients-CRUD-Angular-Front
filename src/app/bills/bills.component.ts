import { Component, OnInit } from '@angular/core';
import { Bill } from 'src/models/bill';
import { ClientService } from '../clients/client.service';
import { ActivatedRoute } from '@angular/router';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, flatMap} from 'rxjs/operators';

import Client from 'src/models/client';
import { BillService } from './bill.service';
import { Product } from 'src/models/product';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html'
})
export class BillsComponent implements OnInit {

  title: string = "New Bill";
  bill: Bill = new Bill();
  

  autoCompleteControl = new FormControl();
  products: string[] = ['Table', 'Chair', 'Lamp','Long Skate'];
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


  showName(product?: Product): string | undefined{
    return product ? product.name : undefined
  }

  
  private _filter(value: string): Observable<Product[]> {
    const filterValue = value.toLowerCase();
    return this.billService.filterProducts(filterValue);
  }






}
