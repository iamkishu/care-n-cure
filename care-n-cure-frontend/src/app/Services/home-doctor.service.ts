import { Injectable } from '@angular/core';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HomeDoctorService {
  private patientListUrl = environment.BASE_URL + '/doctor/doc/patientDet?doctorEmail=';
  private patientVitalUrl = environment.BASE_URL + '/doctor/doc/patientVitals?patientEmail=';
  private prescribeUrl = environment.BASE_URL + '/doctor/doc/prescribe';
  private endUrl = environment.BASE_URL + '/doctor/doc/endChat';
  private logoutUrl = environment.BASE_URL + '/logout';

  private rxjsOb = new BehaviorSubject<any>([]);
  rxJsInfo = this.rxjsOb.asObservable();

  headerOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }
  rxjsUpdateInfo(value) {
    this.rxjsOb.next(value);
  }


  patientList(data): Observable<any> {
    return this.http.get(this.patientListUrl + data.doctorEmail).pipe(
      catchError(this.handleError)
    );
  }

  patientVital(data): Observable<any> {
    return this.http.get(this.patientVitalUrl + data.patientEmail).pipe(
      catchError(this.handleError)
    );
  }

  logPrescribe(data): Observable<any> {
    return this.http.post(this.prescribeUrl, data).pipe(
      catchError(this.handleError)
    );
  }
  
  endSession(data): Observable<any> {
    return this.http.post(this.endUrl, data).pipe(
      catchError(this.handleError)
    );
  }

  logOut(data): Observable<any> {
    return this.http.post(this.logoutUrl, data).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(err: HttpErrorResponse) {
    return throwError(err.error);
  }
}

