import { Component, OnInit } from '@angular/core';
import { LoginService } from '../_service/login.service';
import { StorageService } from '../_service/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'nx-repo-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  private roles: string[] = [];
  private token?: any;
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  email?: string;
  isAdmin = false;
  user : any;

  constructor(private storageService: StorageService, private authService: LoginService, private router : Router) { }

  ngOnInit(){
    this.isLoggedIn = this.storageService.isLoggedIn();
    this.isAdmin = this.storageService.isAdmin();
    this.user = this.storageService.getUser();
    console.log("user : "  + typeof(this.user) )
  }


  logout(): void {
    this.storageService.clean();
    this.isLoggedIn = false;
    window.location.reload();
}
}
