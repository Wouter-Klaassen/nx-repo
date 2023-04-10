import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../_service/product.service';
import { Product } from '../model/product.schema';
import { stringify } from 'querystring';
import { Subscription } from 'rxjs';

@Component({
  selector: 'nx-repo-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  
  product? : any

  title = new FormControl();
  description = new FormControl();
  prijs = new FormControl();
  category = new FormControl();
  brand = new FormControl();
  private routeSub: Subscription | undefined;
  data :any

  productIdFromRoute = '';

  constructor(
    private route: ActivatedRoute, 
    private productService : ProductService
  ) { }
  
  async ngOnInit() {
    await this.loadProduct()


    // this.productIdFromRoute = String(routeParams.get('productId'));
    // console.log('id: ' + this.productIdFromRoute)
    // if(this.productIdFromRoute != null){
    //   if(this.productService.getById(this.productIdFromRoute) != undefined){
    //     this.product = this.productService.getById(this.productIdFromRoute)
    //   }
    // }
  }

  async loadProduct(){
    this.routeSub = this.route.params.subscribe(params =>{
      console.log('id : ' + params['productId'])
      if(params['productId'] != '-1'){
        this.productService.getById(params['productId']).subscribe(res => {
          this.product = res
          this.title.setValue( this.product.name)
          this.description.setValue(this.product.description) 
          this.prijs.setValue( this.product.price)
          this.category.setValue(this.product.category) 
          this.brand.setValue(this.product.brand) 
        })
      }
      this.productIdFromRoute = params['productId']
    })
  }

  async add(){
    if(this.title.value != null && this.description.value != null && this.prijs.value != null){
      this.data = this.productService.getAll().subscribe()
      

      const price : number = +this.prijs.value
      const newProduct = {

        name : this.title.value,
        description : this.description.value,
        price : price,
        category : this.category.value,
        brand : this.brand.value
        
      }
      this.productService.create(newProduct).subscribe()
    }
  }

  edit(){
    
      const price : number = +this.prijs.value
      const update = {

        name : this.title.value,
        description : this.description.value,
        price : price,
        category : this.category.value,
        brand : this.brand.value
      }
      this.productService.update(this.productIdFromRoute,update).subscribe()
  }
}

