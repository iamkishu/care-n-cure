import { Injectable } from '@angular/core';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MentalHealthService {
  private logListUrl = environment.BASE_URL + '/patient/cons/dairyList?patientEmail=';
private logUrl =  environment.BASE_URL + '/patient/cons/dairy';

  private rxjsOb = new BehaviorSubject<any>([]);
  rxJsInfo = this.rxjsOb.asObservable();

  headerOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }
  rxjsUpdateInfo(value) {
    this.rxjsOb.next(value);
  }

  

  logList(data): Observable<any> {
    console.log(data.patientEmail);
    return this.http.get(this.logListUrl+data.patientEmail).pipe(
      catchError(this.handleError)
    );
  }

  log(data): Observable<any> {
    return this.http.post(this.logUrl, data).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    return throwError(err.error);
  }
}

