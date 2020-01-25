import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bill } from 'src/models/bill';

@Injectable({
  providedIn: 'root'
})
export class BillsService {

  private urlEndPoint: string = "htpp://localhost:9090/api/bills";

  constructor(private http: HttpClient) { 
  
  }

  getBill(id: number): Observable<Bill>{
    return this.http.get<Bill>(`${this.urlEndPoint}/${id}`);
  }
}
