import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  public modal: Boolean = false;

  public openModal(){
    this.modal = true;
  }

  public closeModal(){
    this.modal = false;
  }

  constructor() { }
}
