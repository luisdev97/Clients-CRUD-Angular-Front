import { Injectable } from '@angular/core';
import Client from 'src/models/client';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';



//{ providedIn: 'root' }
@Injectable()
export class ClientService {

  private urlEndPoint: string = 'http://localhost:9090/api/clients';

  constructor(private http: HttpClient) { }

  getClients(): Observable<Client[]>{
    //El metodo get del objeto http siempre retornara un observable
    let clients = this.http.get<Client[]>(this.urlEndPoint);
    return clients;
  }
  
}
