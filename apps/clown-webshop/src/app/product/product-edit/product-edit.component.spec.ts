import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ProductEditComponent } from './product-edit.component';
import { ProductService } from '../../_service/product.service';
import { Observable, Subscriber } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { on } from 'events';

describe('ProductEditComponent', () => {
  let component: ProductEditComponent;
  let fixture: ComponentFixture<ProductEditComponent>;
  let productService : MockProductService
  let route : MockActivedRoute
  let one =  {
    id : "1",
    name : "test one",
    brand : "false brand",
    category : "false category",
    price : 20,
    description : "false description"
  }


  class MockProductService{  
      getOne(){
        return one
      }

      getById(id : string){
        return new Observable((Subscriber)=>{
          Subscriber.next(one)
        })
        // return one
      }
      
      update(id: string, updates : any){
        one = updates
        return new Observable((Subscriber) => {
          const success = true;
        })
      }
      
    }

  class MockActivedRoute{
    params = new Observable((Subscriber) =>{
      const productId = "1"
      Subscriber.next([productId])
    })
  }
    
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductEditComponent ],
      providers: [
        MockProductService,
        {provide: ProductService, useClass : MockProductService},
        MockActivedRoute,
        {provide: ActivatedRoute, useClass: MockActivedRoute}
      ],
      imports: [FormsModule, ReactiveFormsModule]
    })
    .compileComponents();

    productService = TestBed.inject(MockProductService);
    route = TestBed.inject(MockActivedRoute)

    fixture = TestBed.createComponent(ProductEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be edited', () => {
    expect(component).toBeTruthy();

    const mockData =
    {
      name : "test succes",
      brand : "test brand",
      category : "test category",
      price : 20,
      description : "test description"
    }

    component.title.setValue( mockData.name)
    // console.log(component.title.value)
    component.brand.setValue(mockData.brand)
    // console.log(component.brand.value)
    component.category.setValue(mockData.category)
    // console.log(component.category.value)
    component.prijs.setValue(mockData.price)
    // console.log(component.prijs.value)
    component.description.setValue(mockData.description)
    // console.log(component.description.value)

    component.edit()



    expect(productService.getOne()).toEqual(mockData)

  });


  it('should get one', ()=>{
    component.loadProduct()

    let cringe :any
    productService.getById('1').subscribe(res => {
      cringe = res
    })
    // console.log("res : "+ cringe)
    // console.log(productService.getById("1").subscribe())

    expect(component.product).toEqual(one)
  })
});
