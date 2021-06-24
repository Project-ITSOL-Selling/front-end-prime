import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {environment} from '../../../../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormProviderRequest} from '../../../utils/form-provider-req';
import {DataResponse} from '../../../utils/data-response';

const header = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = `${environment.apiUrl}oauth/`;

  constructor(
    private cookie: CookieService,
    private http: HttpClient,
    private router: Router,
  ) {
  }

  public google(form: FormProviderRequest): Observable<DataResponse> {
    return this.http.post<DataResponse>(`${this.baseUrl}google`, form, header);
  }

  public facebook(form: FormProviderRequest): Observable<DataResponse> {
    return this.http.post<DataResponse>(`${this.baseUrl}facebook`, form, header);
  }

  logOut() {
    sessionStorage.clear();
    this.cookie.deleteAll();
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
  }

  public createUser(form: any): Observable<DataResponse> {
    return this.http.post(`${environment.apiUrl}user/register`, form);
  }

  public login(form: any): Observable<DataResponse> {
    return this.http.post(`${this.baseUrl}authenticate`, form);
  }
}
