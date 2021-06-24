import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CommonUtils} from './common-utils.service';
import {BasicService} from './basic.service';

@Injectable({
  providedIn: 'root',
})
export class BillOrderService extends BasicService {
  private readonly baseUrl = `${environment.apiUrl}billOrder/`;

  constructor(
    public http: HttpClient,
  ) {
    super('baseUrl', 'bill_order', http);
  }

  getListBillOrder(): Observable<any> {
    return this.http.get(`${this.baseUrl}getListBillOrder`);
  }

  createBillOrder(form: any): Observable<any> {
    return this.http.post(`${this.baseUrl}createBillOrder`, form);
  }

  deleteBillOrderById(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}deleteBillOrder/${id}`, id);
  }

  searchBillOrder(data?: any, event?: any): Observable<any> {
    if (!event) {
      this.credentials = Object.assign({}, data);
    }
    const searchData = CommonUtils.convertData(this.credentials);
    if (event) {
      searchData._search = event;
    }
    const buildParams = CommonUtils.buildParams(searchData);
    return this.http.get(`${this.baseUrl}search`, {params: buildParams});
  }
}
