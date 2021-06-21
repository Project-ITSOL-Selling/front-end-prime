import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DataResponse} from '../../utils/data-response';
import {CommonUtils} from './common-utils.service';
import {BasicService} from './basic.service';
import {Category} from '../../utils/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService extends BasicService {
  private readonly baseUrl = `${environment.apiUrl}category/`;

  constructor(
    public http: HttpClient,
  ) {
    super('baseUrl', 'categories', http);
  }

  getListCategory(): Observable<any> {
    return this.http.get(`${this.baseUrl}getlistcategory`);
  }

  createCategory(form: any): Observable<any> {
    return this.http.post(`${this.baseUrl}createcategory`, form);
  }

  deleteCategoryById(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}deletecategory/${id}`, id);
  }

  searchCategory(data?: any, event?: any): Observable<any> {
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
