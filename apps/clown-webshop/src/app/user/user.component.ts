import { Component } from '@angular/core';
import { UserService } from '../shared/form.service';
import { User } from './model/user.schema';

@Component({
  selector: 'users',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  constructor(
    private formService: UserService
    ) { }
    
  users = this.formService.getAll();

  deleteUser(user : User){
    this.formService.deleteUser(user);
    this.users = this.formService.getAll();
  }

  deleteAll(){
    this.formService.clear();
  }
}

