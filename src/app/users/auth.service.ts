import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user: User;
  private _token: string;


  constructor(private http: HttpClient) { 
    
  }

  public get user(): User {
    if(this._user != null){
      return this._user;
    }else if(this._user == null && sessionStorage.getItem("user")){
      this._user = JSON.parse(sessionStorage.getItem("user")) as User;
      return this._user;
    }else{
      return new User();
    }
  }

  public get token(): string {
    if(this._user != null){
      return this._token;
    }else if(this._token == null && sessionStorage.getItem("token") != null){
      this._token =  sessionStorage.getItem("token");
      return this._token;
    }else{
      return null;
    }
  }

  login(user: User): Observable<any>{

    const URL_ENDPOINT = "http://localhost:9090/oauth/token";
    const CREDENTIALS = btoa('angularapp' + ':' + '12345'); 
    const HTTP_HEADERS = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + CREDENTIALS
      })
    }

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', user.username);
    params.set('password', user.password);

    return this.http.post<any>(URL_ENDPOINT, params.toString(), HTTP_HEADERS);

  }

  saveUser(accessToken: string): void{

    const payload = this.getTokenData(accessToken);
    const { name, surname, email, user_name: username, authorities: roles } = payload;


    this._user = new User();
    this._user.name = name;
    this._user.surname = surname;
    this._user.email = email;
    this._user.username = username;
    this._user.roles = roles;

    sessionStorage.setItem("user",JSON.stringify(this._user));
  
  }
 
  saveToken(accessToken: string): void{
    this._token = accessToken;
    sessionStorage.setItem("token", accessToken);
  }

  getTokenData(accessToken: string): any{

    if(accessToken !== null){
      return JSON.parse(atob(accessToken.split(".")[1]));
    }

    return null;
  }


  isAuthenticated(): boolean{
    let payload = this.getTokenData(this.token);
    if(payload != null && payload.user_name && payload.user_name.length > 0 )
      return true;
    else
      return false;
  }
}
