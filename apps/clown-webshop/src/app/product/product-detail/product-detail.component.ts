import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../shared/form.service';
import { Product } from '../model/product.schema';

@Component({
  selector: 'nx-repo-product',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product : Product | undefined;

  constructor(
    private route: ActivatedRoute, 
    private formService : ProductService) { }

  ngOnInit(): void {
    
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('productId'));

    this.product = this.formService.getAll().find(product => product.id === productIdFromRoute);
  }

}
