import { Injectable } from '@angular/core';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ConsultationService {
  private videoCallUrl = environment.BASE_URL + '/patient/cons/chatId';
  private patientVitalsUrl =  environment.BASE_URL + '/patient/cons/vitals';
  private doctorsListUrl =  environment.BASE_URL + '/patient/cons/doctorList';
  private consultUrl = environment.BASE_URL + '/patient/cons/bookDoctor';
  private presUrl = environment.BASE_URL + '/patient/cons/prescription?patientEmail=';

  private rxjsOb = new BehaviorSubject<any>([]);
  rxJsInfo = this.rxjsOb.asObservable();

  headerOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }
  rxjsUpdateInfo(value) {
    this.rxjsOb.next(value);
  }

  videoCallLink(data): Observable<any> {
    return this.http.post(this.videoCallUrl, data).pipe(
      catchError(this.handleError)
    );
  }

  patientVitalsDataSave(data): Observable<any> {
    return this.http.post(this.patientVitalsUrl, data).pipe(
      catchError(this.handleError)
    );
  }

  doctorList(): Observable<any> {
    return this.http.get(this.doctorsListUrl).pipe(
      catchError(this.handleError)
    );
  }

  consultDoctor(data): Observable<any> {
    return this.http.post(this.consultUrl, data).pipe(
      catchError(this.handleError)
    );
  }

  presList(data): Observable<any> {
    console.log(data)
    return this.http.get(this.presUrl + data.email).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    return throwError(err.error);
  }
}

