import { Injectable } from '@angular/core';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private registerUrl = environment.BASE_URL + '/register';
  private loginUrl = environment.BASE_URL + '/login';
 


  private rxjsOb = new BehaviorSubject<any>([]);
  rxJsInfo = this.rxjsOb.asObservable();

  headerOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }
  rxjsUpdateInfo(value) {
    this.rxjsOb.next(value);
  }

  registerPerson(data): Observable<any> {
    return this.http.post(this.registerUrl, data).pipe(
      catchError(this.handleError)
    );
  }

  loginPerson(data): Observable<any> {
    return this.http.post(this.loginUrl, data).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(err: HttpErrorResponse) {
    return throwError(err.error);
  }
}

