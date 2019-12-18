import { Injectable } from '@angular/core';
import clientList from './clients.json';
import Client from 'src/models/client';
//{ providedIn: 'root' }
@Injectable()
export class ClientService {

  constructor() { }

  getClients(): Client[]{
    return clientList;
  }
  
}
