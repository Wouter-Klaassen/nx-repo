import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../_badservice/review.bad.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'nx-repo-review-edit',
  templateUrl: './review-edit.component.html',
  styleUrls: ['./review-edit.component.css'],
})
export class ReviewEditComponent implements OnInit {

  reviewIdFromRoute = '';

  text = new FormControl()
  outOfTen = new FormControl()
  productId = '';
  userId = '';
  review: any;

  private routeSub: Subscription | undefined;

  constructor(private route: ActivatedRoute, private reviewService : ReviewService) {}

  async ngOnInit(): Promise<void> {
    await this.loadReview()
  }

  async loadReview(){
    this.routeSub = this.route.params.subscribe(params =>{
      this.reviewService.getById(params['reviewId']).subscribe(
        res=>{
          this.review = res
          this.text.setValue(this.review.text)
          this.outOfTen.setValue(this.review.rating)
          this.productId = this.review.productId
          this.userId = this.review.userId
        }
      )
      this.reviewIdFromRoute = params['reviewId']
    })
  }

  edit(){
      const ratingOutOfTen : number = +this.outOfTen.value
      const update = {
          text : this.text.value,
          ratingOutOfTen : ratingOutOfTen,
          userId : this.userId,
          productId : this.productId,
          _id : this.reviewIdFromRoute
      }
      this.reviewService.update(this.reviewIdFromRoute, update)
  }
}
