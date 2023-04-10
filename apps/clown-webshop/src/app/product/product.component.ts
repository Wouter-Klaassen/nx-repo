import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_service/product.service';
import { Product } from './model/product.schema';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from '../_service/storage.service';
import { Shopcart } from '@nx-repo/data';
import { ShopcartService } from '../_service/shopcart.service';

@Component({
  selector: 'nx-repo-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productData:any;
  isAdmin = false;
  isLoggedIn = false;
  dud : any;
  
  routeSub : Subscription | undefined

  constructor(
    private productService : ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private storageService : StorageService,
    private shopcartService : ShopcartService
    ) {}


  async ngOnInit(): Promise<void> {
    this.loadProducts()
    this.isAdmin = this.storageService.isAdmin()
    this.isLoggedIn = this.storageService.isLoggedIn()
  }



  async loadProducts(){
    this.routeSub = this.productService.getAll().subscribe(res=>{
      console.log('res type ' + typeof(res))
      this.productData=res;
    })
  }  

  addToCart(data:any){
    this.shopcartService.addToCart(data)
  }
  

  delete(id: string){
    this.productService.delete(id).subscribe();
    this.loadProducts()
    this.router.navigate(['/'])
  }

}
