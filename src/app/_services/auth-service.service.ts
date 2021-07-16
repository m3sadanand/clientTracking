import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient) { }
  url:string = "http://182.18.138.170:11010/odoconnew/newsignin";

  // login(data):Observable<any>{
  //   return this.http.post(`${baseUrl}users/login`,data)
  // }

  login(data){
    let reqObj = {};
    reqObj = {
      userName: data.email,
      password: data.password
    }
    return this.http.post(this.url, reqObj).pipe(tap(res => {}));
  }
}
