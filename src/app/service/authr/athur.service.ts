import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class AthurService {

  constructor(
    private http: HttpClient
  ) { }


  createUser(data:any){
    return this.http.post('http://localhost:9006/api/create', data).toPromise()
  }

  loginUser(data:any){
    return this.http.post('http://localhost:9006/login', data).toPromise()
  }

  loginVerifyUser(data:any){
    return this.http.post('http://localhost:9006/api/verfiyOTP', data).toPromise()
  }
}
