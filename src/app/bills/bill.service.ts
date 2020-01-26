import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bill } from 'src/models/bill';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  private urlEndPoint: string = "http://localhost:9090/api/bills";

  constructor(private http: HttpClient) { 
  
  }

  getBill(id: number): Observable<Bill>{
    console.log(this.urlEndPoint + "/" + id);
    return this.http.get<Bill>(`${this.urlEndPoint}/${id}`);
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`);
  }
  
}
