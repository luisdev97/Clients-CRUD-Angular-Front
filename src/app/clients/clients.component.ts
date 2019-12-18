import { Component, OnInit } from '@angular/core';
import Client from '../../models/client';
import { ClientService } from './client.service';

@Component({
  selector: 'Clients',
  templateUrl: './clients.component.html',
})

export class ClientsComponent implements OnInit {

  clients: Array<Client>;

  constructor(private clientService: ClientService ) {
  
  }

  ngOnInit() {
    this.clientService.getClients().subscribe(
      clients => this.clients = clients
    );
  }

}
