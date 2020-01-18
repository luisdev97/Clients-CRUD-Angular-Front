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
  private httpHeaders = new HttpHeaders({ 'content-Type': 'application/json' })
  

  private isNotAuthorized(e): boolean{
    if(e.status == 401 || e.status == 403){
      this.router.navigate(['/login']);
      return true;

    }
    else
      return false;
  }

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  private getHttpHeaders(){
    const token = this.authService.token;
    if(token) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
      
    return this.httpHeaders;
  }

  
  getClients(page: number = 0): Observable<any> {
    //El metodo get del objeto http siempre retornara un observable
    let observable = this.http.get(this.urlEndPoint + "/page/" + page);
    return observable.pipe(
      tap( (response: any) => {
        (response.content as Client[]).forEach( c => {
          //console.log(c);
        })
      }),
      map((response : any)=> {
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
    return this.http.get<Client>(`${this.urlEndPoint}/${id}`, { headers: this.getHttpHeaders() }).pipe(
      catchError(e => {

        if(this.isNotAuthorized(e)){
          return throwError(e);
        }

        this.router.navigate(['/clients']);
        swal.fire(`Error removing the client with ID ${id}`, e.error.message , 'error');
        console.log(e.error.message);
        return throwError(e);
      })
    );
  }


  create(client: Client): Observable<Client> {
    let newClient = this.http.post<any>(this.urlEndPoint, client, { headers: this.getHttpHeaders() });
    return newClient.pipe(
      map(response => response.client as Client), 
      catchError(e => {

        if(this.isNotAuthorized(e)){
          return throwError(e);
        }

        if( e.status === 400 )
          return throwError(e);
        
        swal.fire(e.error.message , e.error.preciseMessage , 'error');
        return throwError(e);
      })
    );
  }



  update(client: Client): Observable<Client> {
    let updatedClient = this.http.put<any>(`${this.urlEndPoint}/${client.id}`, client, { headers: this.getHttpHeaders() });
    return updatedClient.pipe(
      map(response => response.client as Client),
      catchError(e  => {

        if(this.isNotAuthorized(e)){
          return throwError(e);
        }

        if( e.status === 400 )
          return throwError(e);

        swal.fire(`Error modifying the client with ID ${client.id}`, e.error.message , 'error');
        return throwError(e);
      })
    );
  }



  delete(id: number): Observable<Client>{
    let removedClient = this.http.delete<Client>(`${this.urlEndPoint}/${id}`, { headers: this.getHttpHeaders() });
    return removedClient.pipe(
      catchError(e => {

        if(this.isNotAuthorized(e)){
          return throwError(e);
        }

       // if( e.status === 400 )
         // return throwError(e)
        swal.fire(`Error removing the client with ID ${id}`, e.error.message , 'error');
        return throwError(e);
      })
    );
  }

  uploadImage(file: File, id): Observable<HttpEvent<{}>>{

    let formData = new FormData();
    formData.append("file", file);
    formData.append("id", id); 

    let httpHeaders =  new HttpHeaders();
    const token = this.authService.token;
    if(token)
      httpHeaders = httpHeaders.append("Authorization","Bearer " + token);

    const request = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true,
      headers: httpHeaders
    });
    
    return this.http.request(request).pipe(
      catchError(e => {
        this.isNotAuthorized(e);
        return throwError(e);
      })
      );
  } 
  


  getRegions(): Observable<Region[]>{
    return this.http.get<Region[]>(this.urlEndPoint + '/regions', { headers: this.getHttpHeaders() }).pipe(
      catchError(e => {
        this.isNotAuthorized(e);
        return throwError(e);
      })
    );   
  }

}
