import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Customer} from '../customer';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = `${environment.apiUrl}customer`;

  constructor(
    private http: HttpClient,
    private router: Router) {
  }

  getListCustomer(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.baseUrl}`)
  }

  getSingleCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}/${id}`);
  }

  createCustomer(customer: Customer) {

    return this.http.post(`${this.baseUrl}`, customer);
  }

  updateCustomer(id: number, customer: Customer) {
    return this.http.put(`${this.baseUrl}/${id}`, customer);
  }

  deleteCustomer(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
