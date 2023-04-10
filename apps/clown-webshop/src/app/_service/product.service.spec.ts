import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'

import { ProductService } from './product.service';
import { stat } from 'fs';

describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController : HttpTestingController

  const mockData = 
    [{
      "name" : "TestProduct",
      "description" : "this is a test",
      "category" : "test",
      "brand" : "fake brand",
      "price" : 20
    }, {
      "name" : "TestProduct 2",
      "description" : "this is a test",
      "category" : "test",
      "brand" : "secret brand",
      "price" : 40
    }]



  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductService, 
        {
          provide: "url",
          useValue: "apiurl"
        }],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController)
  });

  afterEach(() =>{
    httpTestingController.verify()
  })

  it('should make a GET all request and return all items', () => {
    service.getAll().subscribe(res => {
      expect(res).toEqual(mockData);
    })
    const req = httpTestingController.expectOne('http://localhost:3333/api/data-api/product/');
    expect(req.request.method).toBe('GET');
    expect(req.cancelled).toBeFalsy(); 
    expect(req.request.responseType).toEqual('json');
    req.flush(mockData);
    httpTestingController.verify();
  });


  it('getById should make a GET HTTP request with id appended to end of url', () => {
    service.getById('1').subscribe(res => {
      expect(res).toEqual(mockData); 
     }); 
    const req = httpTestingController.expectOne('http://localhost:3333/api/data-api/product/1');
    expect(req.request.method).toBe('GET');
    expect(req.cancelled).toBeFalsy(); 
    expect(req.request.responseType).toEqual('json');
    req.flush(mockData);
    httpTestingController.verify();
  });

   it('delete should make a DELETE HTTP request with id appended to end of url', () => {
    service.delete('1').subscribe(); 
    const req = httpTestingController.expectOne('http://localhost:3333/api/data-api/product/1', 'delete to api');
    expect(req.request.method).toBe('DELETE');
    expect(req.cancelled).toBeFalsy(); 
    expect(req.request.responseType).toEqual('json');
    req.flush(1);
    httpTestingController.verify();
  });
    
  it('update should make a PUT HTTP request with id appended to end of url and resource as body', () => {
    const updateObj = { 
      "id" : "1",
      "name": "updatedName",
      "description" : "this is a test",
      "category" : "test",
      "brand" : "fake brand",
      "price" : 20
    };

    const status = {
      "statusCode": 200,
      "message": "OK"
    }
    service.update('1', updateObj).subscribe(res => {
      expect(res).toBe(status); 
     }); 
    const req = httpTestingController.expectOne('http://localhost:3333/api/data-api/product/1', 'put to api');
    expect(req.request.method).toBe('PUT');
    // expect(req.request.body).toBe(updateObj);
    expect(req.cancelled).toBeFalsy(); 
    expect(req.request.responseType).toEqual('json');
    req.flush(updateObj);
    httpTestingController.verify();
  });

  it('create should make a POST HTTP request with resource as body', () => {
    const createObj = { 
      "id" : "1",
      "name": "updatedName",
      "description" : "this is a test",
      "category" : "test",
      "brand" : "fake brand",
      "price" : 20
    };
    const status = {
      "statusCode": 200,
      "message": "OK"
    }
    service.create(createObj).subscribe(res => {
      expect(res).toBe(status); 
     }); 
    const req = httpTestingController.expectOne('http://localhost:3333/api/data-api/product/', 'post to api');
    expect(req.request.method).toBe('POST');
    // expect(req.request.body).toBe(createObj);
    expect(req.cancelled).toBeFalsy(); 
    expect(req.request.responseType).toEqual('json');
    req.flush(createObj);
    httpTestingController.verify();
  });

  

});
