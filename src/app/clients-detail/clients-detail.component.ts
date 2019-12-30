import { Component, OnInit } from '@angular/core';
import Client from '../../models/client';
import { ClientService } from '../clients/client.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
@Component({
  selector: 'ClientDetail',
  templateUrl: './clients-detail.component.html',
  styleUrls: ['./clients-detail.component.css']
})
export class ClientsDetailComponent implements OnInit {

  client: Client;
  title: string = "Client Detail";
  private imgSelected: File;

  constructor(private ClientService: ClientService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let id: number = +params.get('id');
      if(id){
        this.ClientService.getClient(id).subscribe(client => {
          this.client = client;
        })
      }
    });
  }

  selectImage(event){
    this.imgSelected = event.target.files[0];

    if(this.imgSelected.type.indexOf('image') < 0)
      swal.fire('Error Upload', 'The file must be an image', 'error');
    else
      this.uploadImage();
      
  }


  uploadImage(){
    
      this.ClientService.uploadImage(this.imgSelected, this.client.id).subscribe(
        client => {
          this.client = client;
          swal.fire("Image uploaded successfully","","success");
        }
      );
    }

}
