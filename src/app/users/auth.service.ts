import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { 

  }

  login(user: User): Observable<any>{

    const URL_ENDPOINT = "htpp://localhost:9090/oauth/token";
    const CREDENTIALS = btoa('angularapp:12345');
    const HTTP_HEADERS = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${CREDENTIALS}`
      })
    };

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', user.username);
    params.set('password', user.password);
    console.log(params);
    console.log(params.toString());
    return this.http.post<any>(URL_ENDPOINT, params.toString(), HTTP_HEADERS);

  }
}
