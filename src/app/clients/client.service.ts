import { Injectable } from '@angular/core';
import clientList from './clients.json';
import Client from 'src/models/client';
import { of, Observable } from 'rxjs';


//{ providedIn: 'root' }
@Injectable()
export class ClientService {

  constructor() { }

  getClients(): Observable<Client[]>{
    return of(clientList);
  }
  
}
