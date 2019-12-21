import { Injectable } from '@angular/core';
import Client from 'src/models/client';
import { of, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';



//{ providedIn: 'root' }
@Injectable()
export class ClientService {

  private urlEndPoint: string = 'http://localhost:9090/api/clients';
  private httpHeaders = new HttpHeaders({ 'content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getClients(): Observable<Client[]>{
    //El metodo get del objeto http siempre retornara un observable
    let clients = this.http.get<Client[]>(this.urlEndPoint);
    return clients;
  }

  create(client: Client): Observable<Client>{
    let newClient = this.http.post<Client>(this.urlEndPoint, client, { headers: this.httpHeaders });
    return newClient;
  }
  
}
