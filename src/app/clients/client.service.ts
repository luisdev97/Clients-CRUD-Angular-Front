import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import Client from 'src/models/client';
import { Observable, throwError, from } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Region } from '../../models/Region';
import { AuthService } from '../users/auth.service';


//{ providedIn: 'root' }
@Injectable()
export class ClientService {

  private urlEndPoint: string = 'http://localhost:9090/api/clients';

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  /*
  private getHttpHeaders(){
    const token = this.authService.token;
    if(token) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
      
    return this.httpHeaders;
  }
  /*/

  getClients(page: number = 0): Observable<any> {
    //El metodo get del objeto http siempre retornara un observable
    let observable = this.http.get(this.urlEndPoint + "/page/" + page);
    return observable.pipe(
      tap((response: any) => {
        (response.content as Client[]).forEach(c => {
          //console.log(c);
        })
      }),
      map((response: any) => {
        (response.content as Client[]).map(client => {
          client.name = client.name.toUpperCase();
          //client.createAt = formatDate(client.createAt, 'longDate','en');
          return client;
        });
        return response;
      })
    );
  }


  getClient(id): Observable<Client> {
    return this.http.get<Client>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        e.status != 401 && this.router.navigate(['/clients']);
        return throwError(e);
      })
    );
  }


  create(client: Client): Observable<Client> {
    let newClient = this.http.post<any>(this.urlEndPoint, client);
    return newClient.pipe(
      map(response => response.client as Client),
      catchError(e => {

        if (e.status === 400)
          return throwError(e);

        return throwError(e);
      })
    );
  }



  update(client: Client): Observable<Client> {
    let updatedClient = this.http.put<any>(`${this.urlEndPoint}/${client.id}`, client);
    return updatedClient.pipe(
      map(response => response.client as Client),
      catchError(e => {

        if (e.status === 400)
          return throwError(e);

        return throwError(e);
      })
    );
  }


  delete(id: number): Observable<Client> {
    let removedClient = this.http.delete<Client>(`${this.urlEndPoint}/${id}`);
    return removedClient.pipe(
      catchError(e => throwError(e))
    );
  }


  uploadImage(file: File, id): Observable<HttpEvent<{}>> {

    let formData = new FormData();
    formData.append("file", file);
    formData.append("id", id);

    const request = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true
    });

    return this.http.request(request);
  }


  getRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(this.urlEndPoint + '/regions');
  }


}
