import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../model/user.schema';
import { StorageService } from '../../_service/storage.service';
import { LoginService } from '../../_service/login.service';

@Component({
  selector: 'nx-repo-user',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user : any;
  
  constructor(
    private route: ActivatedRoute, 
    private storageService : StorageService,
    private loginService : LoginService) { }


  ngOnInit() {

    const routeParams = this.route.snapshot.paramMap;
    const userIdFromRoute = String(routeParams.get('userId'));

    this.user = this.storageService.getUser();
  }

}
