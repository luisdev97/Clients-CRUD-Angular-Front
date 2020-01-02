import { Injectable , EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  public modal: Boolean = false;
  private _uploadNotification = new EventEmitter<any>();

  public openModal(){
    this.modal = true;
  }

  public closeModal(){
    this.modal = false;
  }

  constructor() { }

  get uploadNotification(): EventEmitter<any>{
    return this._uploadNotification;
  }
}
