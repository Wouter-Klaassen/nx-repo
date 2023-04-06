import { Component } from '@angular/core';
import { StorageService } from './_service/storage.service';
import { LoginService } from './_service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'nx-repo-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ClownWebshop';
  isLoggedIn = false;


  constructor(private storageService: StorageService, private authService: LoginService, private router : Router) { }


  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      console.log(user)
      // this.roles = user.roles;

      // this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      // this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
    }
    else {
      this.router.navigate(['/login']);
    }
  }
}
