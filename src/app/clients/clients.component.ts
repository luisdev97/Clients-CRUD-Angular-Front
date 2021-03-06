import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import Client from '../../models/client';
import { ClientService } from './client.service';
//import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '../clients-detail/modal.service';
import { AuthService } from '../users/auth.service';

@Component({
  selector: 'Clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})

export class ClientsComponent implements OnInit {

  clients: Array<Client>;
  public paginator: any;
  public selectedClient: Client;

  constructor(private clientService: ClientService, private activatedRoute: ActivatedRoute, private modalService: ModalService, private authService: AuthService){
  
  }

  ngOnInit() {
    
    this.activatedRoute.paramMap.subscribe( params => {
      let page: number = Number(params.get('page'));
      this.clientService.getClients(page).subscribe(
        response =>{
          this.clients = response.content as Array<Client>
          this.paginator = response;
        } 
      )
    });
    this.modalService.uploadNotification.subscribe(client => {
      this.clients = this.clients.map(c => {
        if(client.id === c.id)
          c.img = client.img; //c es el cliente que obtenemos del emitter
          
          return c;
        });
       
    });
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
              `Client ${name} successfully deleted`,
              'success'
            );
          }
        );
        
      }
    });
  }

  public openModal(client: Client){
    this.selectedClient = client;
    this.modalService.openModal();
  } 

  

}
