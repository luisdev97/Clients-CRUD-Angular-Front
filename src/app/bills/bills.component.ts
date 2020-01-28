import { Component, OnInit } from '@angular/core';
import { Bill } from 'src/models/bill';
import { ClientService } from '../clients/client.service';
import { ActivatedRoute } from '@angular/router';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import Client from 'src/models/client';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html'
})
export class BillsComponent implements OnInit {

  title: string = "New Bill";
  bill: Bill = new Bill();
  

  autoCompleteControl = new FormControl();
  products: string[] = ['Table', 'Chair', 'Lamp','Long Skate'];
  filteredProducts: Observable<string[]>;

  constructor(private clientService: ClientService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const clientId = +params.get('clientId');     
      this.clientService.getClient(clientId).subscribe(res => {
       this.bill.client = res as Client;
      });
    });

    this.filteredProducts = this.autoCompleteControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }


  
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.products.filter(option => option.toLowerCase().includes(filterValue));
  }




}
