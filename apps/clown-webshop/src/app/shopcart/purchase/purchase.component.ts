import { Component, OnInit } from '@angular/core';
import { ShopcartService } from '../../_service/shopcart.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'nx-repo-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css'],
})
export class PurchaseComponent implements OnInit {

  routeSub : Subscription | undefined 
  purchases : any;

  constructor(
    private shopcartService : ShopcartService,
    private route: ActivatedRoute,
    ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe( params => {
      this.loadPurchases()
    })
  }
  
  loadPurchases(){
    this.routeSub = this.shopcartService.getByUser().subscribe(data=>{
      this.purchases = data
    })
  }
}
