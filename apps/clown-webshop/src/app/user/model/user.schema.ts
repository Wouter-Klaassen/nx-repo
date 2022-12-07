import { range } from "rxjs";

export class User {
    name: string;
    password: string;
    email: string;
    id: number;
    
    
    constructor(name : string) {
        this.id = Math.random();
        this.name = name,
        this.password! = 'secret123';
        this.email = 'r.guilliman@ultramar.ru';
    }
    
    getName(){
        return this.name;
    }
    setName(newName : string){
        this.name = newName;
    }

    getPassword(){
        return this.password;
    }
    setPassword(newPass : string){
        this.password = newPass;
    }

    getEmail(){
        return this.email;
    }
    setEmail(newEmail : string){
        this.email = newEmail;
    }



}