import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { ProductService } from '../_service/product.service';
import * as exp from 'constants';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopcartService } from '../_service/shopcart.service';
import { Observable, Subscription, of } from 'rxjs';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let productService : MockProductService
  let storageService : MockStorageService
  let route : MockActivedRoute
  let router : MockRouter
  let shopcartService : MockShopcartService
  // let subscription : Subscription | undefined

  const data = {
    "name" : "testOne",
    "price" : 200
  }
  // ,{
  //   "name" : "testTwo",
  //   "price" : 40
  // }

  class MockStorageService {
    isLoggedIn(){
      return true
    }

    isAdmin(){
      return true
    }
  }



  class MockProductService{

    // getAll$: of({} as Object),

    async getAll(){
      return new Observable((Subscriber) =>{
        Subscriber.next(data)
      } ) 

    }
  }

  class MockShopcartService {}
  class MockRouter{}

  class MockActivedRoute{

    params = new Observable((Subscriber)=>{
      const productId = "1"
      Subscriber.next([productId])
    }) 
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductComponent ],
      providers : [
        ProductComponent,
        MockProductService,
        {provide : ProductService, useClass: MockProductService},
        MockActivedRoute,
        {provide : ActivatedRoute, useClass: MockActivedRoute},
        MockStorageService,
        {provide : ShopcartService, useClass: MockShopcartService},
        MockShopcartService,
        MockRouter,
        {provide : Router, useClass:MockRouter}
        
        // Subscription,
        // {provide : Subscription}
      ]
    })
    .compileComponents();

    productService = TestBed.inject(MockProductService);
    route = TestBed.inject(MockActivedRoute);
    shopcartService = TestBed.inject(MockShopcartService);
    // subscription = TestBed.inject(Subscription, undefined)

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should read from Product Service', ()=>{
  //   component.loadProducts();

  //   fixture.detectChanges();
  
  //   expect(component.productData).toEqual(productService.getAll());

  // } );

});
