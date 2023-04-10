import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  apiUrl = environment.apiURL + 'data-api/purchase_log/'


  constructor(private http: HttpClient) { }

  //Mongo CRUB

  getAll(){
    return this.http.get(this.apiUrl, httpOptions )
  }

  getById(id: string){
    return this.http.get(this.apiUrl + id, httpOptions)
  }

  update(id: string, updates:any){
    return this.http.put(this.apiUrl + id, updates, httpOptions)
  }

  create(newPurchase:any){
    return this.http.post(this.apiUrl,newPurchase,httpOptions)
  }

  delete(id: string){
    return this.http.delete(this.apiUrl+id,httpOptions)
  }
}
