import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OpentripsService {

  constructor(private http:HttpClient) { }
  urlCorporateOpenTrips = "http://182.18.138.170:11010/odoconnew/getCorporateOpenTrips";
  urlCorporateScheduledTrips = "http://182.18.138.170:11010/odoconnew/getCoporateScheduledTrips";
  urlCorporateClosedTrips = "http://182.18.138.170:11010/odoconnew/getCoporateClosedTrips";
  urlLocation ="http://182.18.138.170:11010/odoconnew/getLocation";

  // getCorporateOpenTrips():Observable<any>{
  //   const param = new HttpParams({
  //     Body:
  //     {
  //       userId: 1,
  //       offset: 0,
  //       limit: 1000
  //     }
  //   });
  //   return this.http.get(this.urlCorporateOpenTrips);
  // }

  getCorporateOpenTrips(){
    let reqObj = {
      userId: 1,
        offset: 0,
        limit: 1000
    }
    return this.http.post(this.urlCorporateOpenTrips , reqObj).pipe(tap(res => {
    }))
  }

  getCorporateScheduledTrips(){
    let reqObj = {
      userId: 1,
        offset: 0,
        limit: 1000
    }
    return this.http.post(this.urlCorporateScheduledTrips , reqObj).pipe(tap(res => {
    }))
  }

  getCorporateClosedTrips(){
    let reqObj = {
      userId: 1,
        offset: 0,
        limit: 1000
    }
    return this.http.post(this.urlCorporateClosedTrips , reqObj).pipe(tap(res => {
    }))
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
