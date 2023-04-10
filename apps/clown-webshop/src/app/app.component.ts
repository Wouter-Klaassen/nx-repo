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

}
