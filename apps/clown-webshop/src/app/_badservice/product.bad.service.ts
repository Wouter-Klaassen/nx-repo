import { Injectable } from "@angular/core";
import { Product } from "@nx-repo/data"
import { BehaviorSubject, Observable, find, from, of, take } from "rxjs"


@Injectable({
    providedIn: 'root'
  })
export class ProductService {
    products : Product[]  = [
        {   
            "_id":"642826147d69ca9ba7dade4c",
            "name":"Clown sokken",
            "description":"Gestreepte regenboog sokken",
            "category":"Kleding",
            "price":40,
            "brand":"nike",
            "reviews":[],
            "relatedProduct":[],
        },    
        {
            "_id":"6428261d7d69ca9ba7dade4e",
            "name":"Clown schoenen",
            "description":"Gestreepte regenboog sokken",
            "category":"Kleding",
            "price":40,
            "brand":"nike",
            "reviews":[],
            "relatedProduct":[],
        },
        {
            "_id":"64345d2fcbcbc80e1f5ea84c",
            "name":"Gestreepte Broek",
            "description":"Broek met regenboog strepen",
            "category":"Kleding",
            "price":40,
            "brand":"nike",
            "reviews":[],
            "relatedProduct":[],
        }]


    transformArray: Observable<Product[]> = of(this.products);


    getAll(){
        return this.transformArray
    }

    getById(id : string){
        let found = this.products.find(a => a._id == id)

        return of(found)
    }

    update(id : string, updates:any){
        let found = this.products.findIndex( x => x._id == id)

        let newProduct: Product =
        {
            relatedProduct: [],
            reviews: [],
            description: updates.description,
            category: updates.category,
            price: updates.price,
            brand: updates.brand,
            _id: id.toString(),
            name: updates.name
        }

        this.products[found] = newProduct
        return new Observable

    }

    create(product : any){
        let id = Math.floor(Math.random()*100)

        
        let newProduct: Product =
        {
            relatedProduct: [],
            reviews: [],
            description: product.description,
            category: product.category,
            price: product.price,
            brand: product.brand,
            _id: id.toString(),
            name: product.name
        }

        this.products.push(newProduct)
        return new Observable

    }

    delete(id : string){
        let product = this.products.find(x => x._id === id)
        if(product != undefined){
            const index: number = this.products.indexOf(product);
            if (index !== -1) {
                this.products.splice(index, 1);
            }         
        } 
        return new Observable
    }
}