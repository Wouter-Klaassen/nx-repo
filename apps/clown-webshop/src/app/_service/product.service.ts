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
export class ProductService {

  apiUrl = environment.apiURL + 'data-api/product/'

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

  create(newProduct:any){
    return this.http.post(this.apiUrl,newProduct,httpOptions)
  }

  delete(id: string){
    return this.http.delete(this.apiUrl + id , httpOptions)
  }

  // Relation

  getByRelated(id: string){
    return this.http.get(this.apiUrl+id + '/relate',httpOptions)
  }

  createRelation(idA: string, idB: string){
    return this.http.post(this.apiUrl+idA + '/relate/' + idB,httpOptions)
  }

  deleteRelation(idA: string, idB: string){
    return this.http.delete(this.apiUrl+idA + '/relate/' + idB,httpOptions)
  }

}
