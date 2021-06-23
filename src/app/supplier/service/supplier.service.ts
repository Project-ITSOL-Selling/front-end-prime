import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Supplier } from '../Supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private baseUrl =`${environment.apiUrl}supplier`;
  
  constructor(
    private http : HttpClient
  ) { }

  getSupplierList(): Observable<Supplier[]>{
    // debugger;
    return this.http.get<Supplier[]>(`${this.baseUrl}`);
  }
  // getSupplierLikeName(name:String): Observable<Object>{
  //   return this.http.get(`${this.baseUrl}/search/name`);
  // }
  getSupplierById(id:number): Observable<Supplier>{
    return this.http.get<Supplier>(`${this.baseUrl}/${id}`);
  }
  createSupplier(supplier : Supplier): Observable<Object>{
    return this.http.post(`${this.baseUrl}`,supplier);
  }
  updateSupplier(id:number,supplier: Supplier): Observable<Object>{
    return this.http.put(`${this.baseUrl}/${id}`, supplier);
  }
}
