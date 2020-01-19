import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class tokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService){
    
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      
      const token = this.authService.token;

      if(token){
        const authRequest = req.clone({
          headers: req.headers.set('Authorization','Bearer ' + token)
        });
        return next.handle(authRequest);
      }

    return next.handle(req);
  }
}