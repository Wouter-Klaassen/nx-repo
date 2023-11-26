import { Injectable } from "@angular/core";
import { Review } from "@nx-repo/data";
import { Observable, of } from "rxjs";
import { StorageService } from "../_service/storage.service";

@Injectable({
    providedIn: 'root'
})
export class ReviewService {

    reviews: Review[] = [


    ]

    transformArray: Observable<Review[]> = of(this.reviews);

    constructor(private storageService : StorageService){}

    getAll() {
        return this.transformArray
    }

    getById(id: string) {
        let found = this.reviews.find(a => a._id == id)

        return of(found)
    }

    update(id: string, updates : any) {
        let found = this.reviews.findIndex( x => x._id == id)

        let newReview: Review =
        {
            title: updates.title,
            rating: updates.ratingOutOfTen,
            text: updates.text,
            userId: updates.userId,
            productId: updates.productId,
            _id: updates._id
        }

        this.reviews[found] = newReview
        return new Observable
    }

    create(id: string, review : any) {
        let _id = Math.floor(Math.random()*100)

        
        let newReview: Review =
        {
            title: review.title,
            rating: review.ratingOutOfTen,
            text: review.text,
            userId: this.storageService.getUser()._id,
            productId: id,
            _id: _id.toString()
        }

        this.reviews.push(newReview)
        return new Observable
    }

    delete(id: string) {
        let review = this.reviews.find(x => x._id === id)
        if(review != undefined){
            const index: number = this.reviews.indexOf(review);
            if (index !== -1) {
                this.reviews.splice(index, 1);
            }         
        } 
        return new Observable
    }


    getByProduct(id: string) {
        
        let found = this.reviews.filter(a => a.productId == id)

        return of(found)
    }

    getByUser(id: string) {

        let found = this.reviews.filter(a => a.userId == id)

        return of(found)
    }
}