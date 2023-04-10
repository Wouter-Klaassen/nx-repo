import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../_service/product.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'nx-repo-related',
  templateUrl: './related.component.html',
  styleUrls: ['./related.component.css'],
})
export class RelatedComponent implements OnInit {

  products:any
  routeId=''
  private subscription: Subscription | undefined;


  constructor(
    private productService : ProductService,
    private route: ActivatedRoute,
    ) {}

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe( params => {
      this.routeId = params['id']})
    this.loadProducts()
  }

  async loadProducts(){
    this.subscription = this.productService.getAll().subscribe(res=>{
      console.log('res type ' + typeof(res))
      this.products=res;
    })
  }  

  async relate(id:string){
    console.log("relateid : " + id)
    this.productService.createRelation(this.routeId, id).subscribe()
  }
}
