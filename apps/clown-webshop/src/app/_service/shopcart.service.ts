import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Id } from '@nx-repo/data';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ShopcartService {

  apiUrl = environment.apiURL + 'data-api/shopcart/'

  products:any

  constructor(private http: HttpClient) { 
    this.products = []
  }

  getAll(){
    return this.http.get(this.apiUrl, httpOptions )
  }

  getById(id: string){
    return this.http.get(this.apiUrl + id, httpOptions)
  }

  getByUser(){
    return this.http.get(this.apiUrl+'user',httpOptions)
  }

  update(id: string, updates:any){
    return this.http.put(this.apiUrl + id, updates, httpOptions)
  }

  create(newShopcart:any){
    return this.http.post(this.apiUrl,newShopcart,httpOptions)
  }

  delete(id: string){
    return this.http.delete(this.apiUrl+id,httpOptions)
  }

  addToCart(product : string){
    this.products.push(product)
  }

  getCart(){
    return this.products
  }

  removeOne(product: any){
    const index = this.products.indexOf(product, 0);
    if (index > -1) {
      this.products.splice(index, 1);
      return this.products
    }
  }
}
