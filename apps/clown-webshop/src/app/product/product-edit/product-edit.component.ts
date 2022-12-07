import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../shared/form.service';
import { Product } from '../model/product.schema';

@Component({
  selector: 'nx-repo-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  
  product? : Product

  title = new FormControl();
  description = new FormControl();
  prijs = new FormControl();

  constructor(
    private route: ActivatedRoute, 
    private formService : ProductService
  ) { }
  
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('productId'));
    if(productIdFromRoute != null){
      if(this.formService.getAll().find(product => product.id === productIdFromRoute) != undefined){
        this.product = this.formService.getAll().find(product => product.id === productIdFromRoute)
      }
    }
  }

  add(){
    if(this.title.value != null && this.description.value != null && this.prijs.value != null){
      const newProduct = new Product()
      newProduct.title = this.title.value;
      newProduct.description = this.description.value
      newProduct.prijs = this.prijs.value
      this.formService.add(newProduct)
    }
  }

  editTitle(){
    this.product?.setTitle(this.title.value)
  }

  editDescription(){
    this.product?.setDescription(this.description.value)
  }

  editPrijs(){
    this.product?.setPrijs(this.prijs.value)
  }

}
