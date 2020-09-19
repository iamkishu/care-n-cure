import { Injectable } from '@angular/core';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CovidService {
  private covidUrl = 'https://microhack.cognitiveservices.azure.com/customvision/v3.0/Prediction/7d0d8f75-d60d-45cd-a41e-f2c91a33fdf2/classify/iterations/Covid/image?'




  private rxjsOb = new BehaviorSubject<any>([]);
  rxJsInfo = this.rxjsOb.asObservable();

  headerOptions = {
    headers: new HttpHeaders({
      'Prediction-Key': '32695e383e1a4245a0e8aed14f5b5a11'
    })
  };



  constructor(private http: HttpClient) { }
  rxjsUpdateInfo(value) {
    this.rxjsOb.next(value);
  }

  
  covidUpload(postData): Observable<any> {
    const fd = new FormData();
     console.log(postData.file);
    if (postData.file) {
      fd.append('image', postData.file);
    }
    return this.http.post(this.covidUrl, fd, this.headerOptions).pipe(
      tap(events => console.log('upload File: ' + JSON.stringify(events))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    return throwError(err.error);
  }
}

