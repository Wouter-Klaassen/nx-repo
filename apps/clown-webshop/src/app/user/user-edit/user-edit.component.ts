import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { User } from '../model/user.schema';
import { UserService } from '../../shared/form.service';

@Component({
  selector: 'edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  
  user? : User

  name = new FormControl();
  password = new FormControl();
  email = new FormControl();


  constructor(
    private route: ActivatedRoute, 
    private formService : UserService) { }


  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const userIdFromRoute = Number(routeParams.get('userId'));
    if(userIdFromRoute != null){
      if(this.formService.getAll().find(user => user.id === userIdFromRoute) != undefined){
        this.user = this.formService.getAll().find(user => user.id === userIdFromRoute)
      }
    }
  }

  addUser(){
    if(this.name.value != null && this.password.value != null && this.email.value != null){
      const newUser = new User(this.name.value)
      newUser.setPassword(this.password.value)
      newUser.setEmail(this.email.value)
      this.formService.addUser(newUser)
    }
  }

  editName(){
    this.user?.setName(this.name.value);
  }

  editPassword(){
    this.user?.setPassword(this.password.value);
  }

  editEmail(){
    this.user?.setEmail(this.email.value);
  }

}
