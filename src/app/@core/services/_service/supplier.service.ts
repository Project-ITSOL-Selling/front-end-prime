import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  private baseUrl = `${environment.apiUrl}supplier`;

  constructor(
    private http: HttpClient,
    private router: Router) {
  }

  getListSupplier(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }

  getSingleSupplier(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  createSupplier(data: any) {
    return this.http.post(`${this.baseUrl}`, data);
  }

  updateSupplier(id: number, data: any) {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  deleteSupplier(id: any) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
