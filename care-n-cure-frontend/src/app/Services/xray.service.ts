import { Injectable } from '@angular/core';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class XrayService {
  private xrayUrl = 'https://microhack.cognitiveservices.azure.com/customvision/v3.0/Prediction/e86d530f-7bad-49cc-8665-2dbff72104ea/classify/iterations/Pneumonia/image'




  private rxjsOb = new BehaviorSubject<any>([]);
  rxJsInfo = this.rxjsOb.asObservable();

  headerOptions = {
    headers: new HttpHeaders({
      // 'Content-Type': 'application/octet-stream',
      'Prediction-Key': '32695e383e1a4245a0e8aed14f5b5a11'
    })
  };



  constructor(private http: HttpClient) { }
  rxjsUpdateInfo(value) {
    this.rxjsOb.next(value);
  }

  
  xrayUpload(postData): Observable<any> {
    const fd = new FormData();
     console.log(postData.file);
    if (postData.file) {
      fd.append('image', postData.file);
    }
    return this.http.post(this.xrayUrl, fd, this.headerOptions).pipe(
      tap(events => console.log('upload File: ' + JSON.stringify(events))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    return throwError(err.error);
  }
}

