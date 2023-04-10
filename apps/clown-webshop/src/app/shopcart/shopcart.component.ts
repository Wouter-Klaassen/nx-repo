import { Component, OnInit } from '@angular/core';
import { ShopcartService } from '../_service/shopcart.service';
import { StorageService } from '../_service/storage.service';

@Component({
  selector: 'nx-repo-shopcart',
  templateUrl: './shopcart.component.html',
  styleUrls: ['./shopcart.component.css'],
})
export class ShopcartComponent implements OnInit {

  shopcarts :any
  isLoggedIn = false;
  isEmpty = true


  constructor(private shopCartService: ShopcartService,private storageService :StorageService) {}

  ngOnInit(): void {
    this.load()
    this.isLoggedIn = this.storageService.isLoggedIn()
  }

  load(){
    this.shopcarts = this.shopCartService.getCart()
    console.log(this.shopcarts.length)
    if(this.shopcarts.length === 0){
      this.isEmpty = false
    }
  }

  loadProducts(){
    this.shopCartService    
  }

  remove(product: any){
    this.shopcarts = this.shopCartService.removeOne(product)
  }

  save(){
    const productIds = []
    const products =[]
    let priceTotal = 0 ;
    for(const product of this.shopcarts){
      productIds.push(product._id)
      products.push(product.name)
      priceTotal += product.price
    }
    const user = this.storageService.getUser()
    const purchase = {
      userId : user.id,
      productIds : productIds,
      products : products,
      priceTotal : priceTotal
    }
    this.shopCartService.create(purchase).subscribe()
    this.shopcarts=[]
  }
}
