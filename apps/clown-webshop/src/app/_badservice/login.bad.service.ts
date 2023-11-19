import { Injectable } from "@angular/core"
import { User } from "@nx-repo/data"
import { Observable, of } from "rxjs"


@Injectable({
    providedIn: 'root'
})
export class LoginService {

    validUsers: User[]

    constructor() {
        this.validUsers = [
            {
                "_id":"640f269a307aa0a7f6dddbcf",
                "username": "bezos",
                "password": "secret123",
                "emailAddress": "jeff@bezos.com",
                "reviews":[],
                "isActive": true,
                "roles":["admin"]
            },
            {
                "_id":"6428464227d20206708ec0a1" ,
                "username": "Jim",
                "password": "secret123",
                "emailAddress": "jim@bozo.nl",    
                "reviews":[],
                "isActive": true,
                "roles":["admin"]
            
            },
            {
                "_id":"64369216392b6edf0868f67a",
                "username":"Bob Schippers",
                "password":"secret123",
                "emailAddress":"bob@schippers.nl",
                "reviews":[],
                "isActive": true,
                "roles":["admin"]
            }
        ]
    }

    login(user: any) {
        let found  = this.validUsers.find(x => x.username == user.username && x.password == user.password)

        return of({"token" : "super-secret-token", "user": found})
    }

    register(user: any) {
        let id = Math.floor(Math.random()*100)

        let newUser: User = {
            reviews: [],
            isActive: true,
            emailAddress: user.emailAddress,
            roles: ["admin"],
            _id: id.toString(),
            username: user.username,
            password: user.password
        }

        this.validUsers.push(newUser)
        
        return new Observable

    }

}