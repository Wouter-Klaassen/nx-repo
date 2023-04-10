import { User } from '../user/model/user.schema';
import { Injectable } from '@angular/core';
import { Product } from '../product/model/product.schema';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    users: User[] = [
      new User('Bob'),
      new User('Henry')
    ]

    addUser(user: User) {
      this.users.push(user);
    }
  
    getAll() {
      return this.users;
    }

    get(id : string){
      return this.users.find(user => user.id === id);
    }
  
    clear() {
      this.users = [];

      return this.users;
    }

    deleteUser(newUser: User){
      let pos = 0;
      
      this.users.forEach(user => {
        if(user == newUser){
          this.users.splice(pos, 1)
        }
        pos++;
      });
           
      return this.users 
    }
 }



@Injectable({
  providedIn: 'root'
})
export class ProductService{
  products: Product[] = [
    new Product,
    new Product
  ]

  getAll(){
    return this.products
  }

  get(id: number){
    return this.products.find(product => product.id === id);
  }

  add(product: Product){
    this.products.push(product);
  }

  delete(product: Product){
    let pos = 0

    this.products.forEach(currentProduct=>{
      if(currentProduct == product){
        this.products.splice(pos, 1)
      }
      pos++
    });
  }
}
