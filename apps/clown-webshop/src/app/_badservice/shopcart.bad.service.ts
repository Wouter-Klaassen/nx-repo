export class ShopcartService {

    products:any

    constructor() { 
      this.products = []
    }

    getAll(){

    }

    getById(id : string){

    }

    update(id : string){

    }

    create(id : string){

    }

    delete(id : string){

    }

    addToCart(product : string){
        this.products.push(product)
      }
    
    getCart(){
        return this.products
    }
    
    removeOne(product: any){
        const index = this.products.indexOf(product, 0);
        if (index > -1) {
            this.products.splice(index, 1);
            return this.products
        }
    }
}