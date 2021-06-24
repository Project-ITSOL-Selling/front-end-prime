import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BasicService} from './basic.service';

@Injectable({
  providedIn: 'root',
})
export class BillDetailService extends BasicService {
  private readonly baseUrl = `${environment.apiUrl}billDetail/`;

  constructor(
    public http: HttpClient,
  ) {
    super('baseUrl', 'bill_detail', http);
  }

  getListBillDetail(): Observable<any> {
    return this.http.get(`${this.baseUrl}getListBillDetail`);
  }

  createBillDetail(form: any): Observable<any> {
    return this.http.post(`${this.baseUrl}createBillDetail`, form);
  }

  deleteBillDetailById(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}deleteBillDetail/${id}`, id);
  }

  // searchBillDetail(data?: any, event?: any): Observable<any> {
  //   if (!event) {
  //     this.credentials = Object.assign({}, data);
  //   }
  //   const searchData = CommonUtils.convertData(this.credentials);
  //   if (event) {
  //     searchData._search = event;
  //   }
  //   const buildParams = CommonUtils.buildParams(searchData);
  //   return this.http.get(`${this.baseUrl}search`, {params: buildParams});
  // }
}
