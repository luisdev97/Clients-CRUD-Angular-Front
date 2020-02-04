import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bill } from 'src/models/bill';
import { Product } from 'src/models/product';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  private urlEndPoint: string = "http://localhost:9090/api/bills";

  constructor(private http: HttpClient) { 
  
  }

  getBill(id: number): Observable<Bill>{
    return this.http.get<Bill>(`${this.urlEndPoint}/${id}`);
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`);
  }

  filterProducts(term: string): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.urlEndPoint}/filter-products/${term}`);
  }


  createBill(bill: Bill): Observable<Bill>{
    return this.http.post<Bill>(this.urlEndPoint, bill);
  }
  
}
