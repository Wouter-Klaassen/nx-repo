import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { User } from '../model/user.schema';
import { UserService } from '../../shared/form.service';
import { LoginService } from '../../_service/login.service';

@Component({
  selector: 'nx-repo-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  
  user? : User

  username = new FormControl();
  password = new FormControl();
  email = new FormControl();


  constructor(
    private route: ActivatedRoute, 
    private userService : UserService,
    private loginService : LoginService,
    private router : Router) { }


  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const userIdFromRoute = String(routeParams.get('userId'));
    if(userIdFromRoute != null){
      if(this.userService.getAll().find(user => user.id === userIdFromRoute) != undefined){
        this.user = this.userService.getAll().find(user => user.id === userIdFromRoute)
      }
    }
  }

  addUser(){
    if(this.username.value != null && this.password.value != null && this.email.value != null){
      const newUser = {
        username: this.username.value,
        emailAddress : this.email.value,
        password: this.password.value
      }
      this.loginService.register(newUser).subscribe()
      this.router.navigate(['/login']);
    }
  }

  editName(){
    this.user?.setName(this.username.value);
  }

  editPassword(){
    this.user?.setPassword(this.password.value);
  }

  editEmail(){
    this.user?.setEmail(this.email.value);
  }

}
