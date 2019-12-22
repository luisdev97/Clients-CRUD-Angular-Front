import { Injectable } from '@angular/core';
import Client from 'src/models/client';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';



//{ providedIn: 'root' }
@Injectable()
export class ClientService {

  private urlEndPoint: string = 'http://localhost:9090/api/clients';
  private httpHeaders = {
    headers: new HttpHeaders({ 'content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) { }

  
  getClients(): Observable<Client[]> {
    //El metodo get del objeto http siempre retornara un observable
    let clients = this.http.get<Client[]>(this.urlEndPoint);
    return clients;
  }


  getClient(id): Observable<Client> {
    return this.http.get<Client>(`${this.urlEndPoint}/${id}`);
  }


  create(client: Client): Observable<Client> {
    let newClient = this.http.post<Client>(this.urlEndPoint, client, this.httpHeaders);
    return newClient;
  }


  update(client: Client): Observable<Client> {
    let updatedClient = this.http.put<Client>(`${this.urlEndPoint}/${client.id}`, client, this.httpHeaders);
    return updatedClient;
  }

  delete(id: number): Observable<Client>{
    console.log(`${this.urlEndPoint}/${id}`);
    return this.http.delete<Client>(`${this.urlEndPoint}/${id}`, this.httpHeaders)
  }

}
