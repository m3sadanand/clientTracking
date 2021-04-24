import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private http:HttpClient) { }
  urlAlert:string ="http://182.18.138.170:11010/odoconnew/alert";
  urlSendEmergencySms : string ="http://182.18.138.170:11010/odoconnew/sendEmergencySms";

  getAlert(tripIdnew):Observable<any>{
    const param = new HttpParams({
      fromObject:{
        tripId: tripIdnew
      }
    });
   return this.http.get(this.urlAlert,{params:param});
  }

  sendAlert(alertObj): Observable<any> {
    return this.http.post(this.urlSendEmergencySms, alertObj);
  }
}
