import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../model/user.schema';
import { UserService } from '../../shared/form.service';

@Component({
  selector: 'user',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user : User | undefined;
  
  constructor(
    private route: ActivatedRoute, 
    private formService : UserService) { }


  ngOnInit() {

    const routeParams = this.route.snapshot.paramMap;
    const userIdFromRoute = Number(routeParams.get('userId'));

    this.user = this.formService.getAll().find(user => user.id === userIdFromRoute);
  }

}
