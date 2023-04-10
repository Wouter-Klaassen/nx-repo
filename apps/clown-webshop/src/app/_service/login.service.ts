import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from '../user/model/user.schema';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  apiUrl = process.env['apiURL'] + 'auth-api/'

  token : string | undefined;
  
  constructor(private http: HttpClient) { }

  login(user : any){
    return this.http.post(this.apiUrl + 'login' , user, httpOptions)
  }

  register(user: any){
    return this.http.post(this.apiUrl + 'register', user, httpOptions)
  }

}
