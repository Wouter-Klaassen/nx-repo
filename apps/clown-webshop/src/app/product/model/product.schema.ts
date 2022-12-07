
export class Product{
    id = Math.random()
    title: string | undefined
    description: string | undefined
    categorie: string | undefined
    prijs = 0.00
    merk: string | undefined
    reviews: string[] | undefined
    relatedProducts: Product[] | undefined

    constructor(){
        this.title = 'Rode neus';
        this.description = '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."'
    }

    setTitle(newTitle : string){
        this.title = newTitle;
    }

    setDescription(newDescription: string){
        this.description = newDescription;
    }

    setPrijs(newPrijs : number){
        this.prijs = newPrijs;
    }
}