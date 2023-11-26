import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model/product.schema';
import { ProductService } from '../../_badservice/product.bad.service';
import { Subscription } from 'rxjs';
import { StorageService } from '../../_service/storage.service';
import { ReviewService } from '../../_badservice/review.bad.service';

@Component({
  selector: 'nx-repo-product',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product? : any
  productIdFromRoute = '';
  private routeSub: Subscription | undefined;
  isAdmin = false
  isLoggedIn = false
  noRelated = true;
  relatedProducts : any;
  private subscription: Subscription | undefined;
  reviewData: any;
  

  constructor(
    private route: ActivatedRoute, 
    private productService : ProductService,
    private storageService: StorageService,
    private reviewService: ReviewService
) { }

  ngOnInit() {
    this.isAdmin = this.storageService.isAdmin()
    this.isLoggedIn = this.storageService.isLoggedIn()
    this.routeSub = this.route.params.subscribe(params =>{
      this.loadProduct(params['productId'])
      // this.loadRelated()
      this.loadReviews()
    })

    // const routeParams = this.route.snapshot.paramMap;
    // const productIdFromRoute = Number(routeParams.get('productId'));

    // this.product = this.formService.getAll().find(product => product.id === productIdFromRoute);
  }

  async loadProduct(params: string){
    console.log('id : ' + params)
    this.productService.getById(params).subscribe((res: any) => {
      this.product = res
    })
    this.productIdFromRoute = params
    console.log('productIdFromRoute : ' + this.productIdFromRoute)
  }

  // async loadRelated(){
  //   this.productService.getByRelated(this.productIdFromRoute).subscribe((res: string) => {
  //     console.log("related products : " + res)
  //     this.relatedProducts = res
  //     if (this.relatedProducts == ''){
  //       this.noRelated = false
  //     }
  //   })

  // }

  loadReviews(){
    this.subscription = this.reviewService.getByProduct(this.productIdFromRoute).subscribe(res=>{
      console.log('res type ' + typeof(res))
      console.log('res : ' + JSON.stringify(res))
      this.reviewData=res;
    })
  }

  // async removeRelation(id:string){
  //   this.productService.deleteRelation(id , this.productIdFromRoute).subscribe()
  // }

  async removeReview(id:string){
    this.reviewService.delete(id).subscribe()
    this.loadReviews()
  }
}