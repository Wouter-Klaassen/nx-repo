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
export class ReviewService {

  apiUrl = environment.apiURL + 'data-api/review/'

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
  
    create(id: string , newReview:any){
      return this.http.post(this.apiUrl+id,newReview,httpOptions)
    }
  
    delete(id: string){
      return this.http.delete(this.apiUrl+id,httpOptions)
    }

    // Relation 

    getByProduct(id:string){
      return this.http.get(this.apiUrl+'product/'+id,httpOptions)
    }

    getByUser(id:string){
      return this.http.get(this.apiUrl+'user/'+ id ,httpOptions)
    }
}
