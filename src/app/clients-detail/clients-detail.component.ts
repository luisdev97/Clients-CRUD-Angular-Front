import { Component, OnInit, Input } from '@angular/core';
import Client from '../../models/client';
import { ClientService } from '../clients/client.service';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from './modal.service';

@Component({
  selector: 'ClientDetail',
  templateUrl: './clients-detail.component.html',
  styleUrls: ['./clients-detail.component.css']
})
export class ClientsDetailComponent implements OnInit {

  @Input() client: Client;
  title: string = "Client Detail";
  private imgSelected: File;
  public progress: number = 0;

  constructor(private ClientService: ClientService , private modalService: ModalService) { }
   
  ngOnInit() {
    /*this.activatedRoute.paramMap.subscribe(params => {
      let id: number = +params.get('id');
      if(id){
        this.ClientService.getClient(id).subscribe(client => {
          this.client = client;
        })
      }
    });*/
  }

  selectImage(event){
    
    this.imgSelected = event.target.files[0];
    this.progress = 0;

    if(this.imgSelected.type.indexOf('image') < 0){
      swal.fire('Error Upload', 'The file must be an image', 'error');
      this.imgSelected = null;
    }  

  }


  uploadImage(){

    if(!this.imgSelected){
      swal.fire('Error Upload', 'The file must be an image', 'error');
    }
    else{
      this.ClientService.uploadImage(this.imgSelected, this.client.id).subscribe(
        event => {
          if(event.type === HttpEventType.UploadProgress){
            this.progress = Math.round((event.loaded/event.total)*100);
          }else if(event.type === HttpEventType.Response){
            let response: any = event.body;
            this.client = response.client as Client;
            swal.fire(`${response.message}`, '', 'success');
          }
          //this.client = client;
         // swal.fire("Image uploaded successfully","","success");
        }
      );
    }
      
  }
      
  


    public closeModal(){
      this.modalService.closeModal();
      this.imgSelected = null;
      this.progress = 0;
    }
}
