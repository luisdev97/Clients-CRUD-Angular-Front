import { Component, OnInit } from '@angular/core';
import { Bill } from 'src/models/bill';
import { ClientService } from '../clients/client.service';
import { ActivatedRoute } from '@angular/router';
import Client from 'src/models/client';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html'
})
export class BillsComponent implements OnInit {

  title: string = "New Bill";
  bill: Bill = new Bill();

  constructor(private clientService: ClientService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    console.log('se va a crear una factura');
    this.activatedRoute.paramMap.subscribe(params => {
      const clientId = +params.get('clientId');     
      this.clientService.getClient(clientId).subscribe(res => {
       this.bill.client = res as Client;
      });
    });
  }

}
