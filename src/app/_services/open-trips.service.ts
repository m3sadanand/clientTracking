import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpentripsService {

  constructor(private http:HttpClient) { }
  urlCorporateOpenTrips = "http://182.18.138.170:11010/odoconnew/CorporateOpenTrips";
  urlLocation ="http://182.18.138.170:11010/odoconnew/getLocation";

  getCorporateOpenTrips():Observable<any>{
    return this.http.get(this.urlCorporateOpenTrips);
  }

  getTripLocation(tripId){
    const param = new HttpParams({
      fromObject:{
        tripId:tripId
      }
    });
    return this.http.get(this.urlLocation,{params:param})
  }
}
