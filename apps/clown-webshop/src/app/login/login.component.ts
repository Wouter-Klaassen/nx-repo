import { Component, OnInit } from '@angular/core';
import { LoginService } from '../_service/login.service';
import { StorageService } from '../_service/storage.service';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'nx-repo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private loginService: LoginService, private storageService: StorageService, private router : Router) {}

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getRoles();
      console.log('roles: ' + this.roles)
      delay(10000);
      this.router.navigate(['/']);
    }  }

  onSubmit(): void {
    const user = {
      username : this.form.username,
      password : this.form.password
    }

    this.loginService.login(user).subscribe({
      next: data => {
        this.storageService.saveUser(data);
        this.storageService.saveToken(data);
        console.log(data)
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getRoles();
        console.log('roles: ' + this.roles)
        this.reloadPage();
      },
      error: err => {
        console.log('error type : ' + typeof(err))
        this.errorMessage = err.error.error;//err.error = undefined
        console.log('error message type : ' + typeof(this.errorMessage))
        this.isLoginFailed = true;
      }
    });
  }
  
  reloadPage(): void {
    window.location.reload();
  }
}
