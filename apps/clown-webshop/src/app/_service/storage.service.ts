import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG4iLCJzdWIiOjEsImlhdCI6MTY3MzI2MzAwNCwiZXhwIjoxNjczMjY2NjA0fQ.AznhUbEbM6d3LY04eH9kt4mwybPtY0EHkFcuFeWjyRU';
const ROLES = []

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem("ROLES");
    window.sessionStorage.setItem("ROLES", user.user.roles);
    window.sessionStorage.removeItem("USER_KEY");
    window.sessionStorage.setItem("USER_KEY", JSON.stringify(user));
  }
  public saveToken(token: any): void{
    window.sessionStorage.removeItem("TOKEN");
    window.sessionStorage.setItem("TOKEN", JSON.stringify(token));

  }

  public getUser(): any {
    const user = window.sessionStorage.getItem("USER_KEY");
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public getRoles(): any {
    const roles = window.sessionStorage.getItem("ROLES");
    console.log("roles: " + roles)
    if(roles){
      return roles
    }

    return {}
  }

  public isAdmin(): any {
    const roles = window.sessionStorage.getItem("ROLES");
    const isAdmin = roles?.includes('admin')
    console.log("Is Admin: " + isAdmin)
    return isAdmin;
  }

  public getToken(): any{
    const token = window.sessionStorage.getItem("TOKEN");
    if(token){
      return JSON.parse(token);//.access_token
    }
    else{
      return ''
    };
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem("USER_KEY");
    if (user) {
      return true;
    }

    return false;
  }
}
