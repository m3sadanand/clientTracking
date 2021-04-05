import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient) { }

  // login(data):Observable<any>{
  //   return this.http.post(`${baseUrl}users/login`,data)
  // }

  login(data){
    console.log("data: ",data)
    if(data.email == 'test' && data.password == 'test')
      return true;
    else
      return false;
  }
}
