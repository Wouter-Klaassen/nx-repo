import { range } from "rxjs";

export class User {
    username: string;
    password: string;
    emailAddress: string;
    id: string;
    
    
    constructor(username : string) {
        this.username = username,
        this.password = 'secret123';
        this.emailAddress = 'r.guilliman@ultramar.ru';
        this.id = ''
    }
    
    getName(){
        return this.username;
    }
    setName(newName : string){
        this.username = newName;
    }

    getPassword(){
        return this.password;
    }
    setPassword(newPass : string){
        this.password = newPass;
    }

    getEmail(){
        return this.emailAddress;
    }
    setEmail(newemailAddress : string){
        this.emailAddress = newemailAddress;
    }



}