import { Component } from '@angular/core';
import { ProductService } from '../shared/form.service';
import { Product } from './model/product.schema';

@Component({
  selector: 'nx-repo-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent  {

  constructor(
    private productService : ProductService
    ) {}

  products = this.productService.getAll();


    
  

  delete(product : Product){
    this.productService.delete(product);
    this.products = this.productService.getAll();
  }

}
