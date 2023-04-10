import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../_service/review.service';

@Component({
  selector: 'nx-repo-review-edit',
  templateUrl: './review-edit.component.html',
  styleUrls: ['./review-edit.component.css'],
})
export class ReviewEditComponent implements OnInit {
  constructor(private reviewService : ReviewService) {}

  ngOnInit(): void {
    crossOriginIsolated
  }
}
