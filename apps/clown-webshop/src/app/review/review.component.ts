import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../_badservice/review.bad.service';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'nx-repo-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit {

  text = new FormControl()
  outOfTen = new FormControl()
  review: any;
  productId = '';
  private subscription: Subscription | undefined;
  reviewData: any;


  constructor(
    private reviewService: ReviewService, 
    private router: Router,    
    private route: ActivatedRoute,

    ) {}

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params =>{
      this.productId = params['id']
    })
  }

  add(){
    if(this.text.value != null && this.outOfTen.value != null){
      const rating : number = +this.outOfTen.value
      const newReview = {
        text : this.text.value,
        ratingOutOfTen : rating
      }
  
      this.reviewService.create(this.productId,newReview).subscribe()
    }
  }


}
