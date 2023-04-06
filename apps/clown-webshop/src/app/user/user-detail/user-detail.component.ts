import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../model/user.schema';
import { UserService } from '../../shared/form.service';
import { LoginService } from '../../_service/login.service';

@Component({
  selector: 'nx-repo-user',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user : User | undefined;
  
  constructor(
    private route: ActivatedRoute, 
    private userService : UserService,
    private loginService : LoginService) { }


  ngOnInit() {

    const routeParams = this.route.snapshot.paramMap;
    const userIdFromRoute = String(routeParams.get('userId'));

    this.user = this.userService.getAll().find(user => user.id === userIdFromRoute);
  }

}
