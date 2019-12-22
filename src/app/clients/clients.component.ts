import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
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

  public delete(client: Client): void {
    const { name, surname } = client;
    swal.fire({
      title: 'Are you sure?',
      text: `Are you sure you want to eliminate ${name} ${surname}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      
      if (result.value) {
        this.clientService.delete(client.id).subscribe(
          response => {
            this.clients = this.clients.filter(c => c !== client);
            swal.fire(
              'Client Deleted!',
              `Client ${name} successfully created`,
              'success'
            );
          }
        );
        
      }
    });
  }

}
