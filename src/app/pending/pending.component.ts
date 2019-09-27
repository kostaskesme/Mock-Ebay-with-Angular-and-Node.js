import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss']
})
export class PendingComponent implements OnInit {

  bool1:boolean = false;
  bool2:boolean = false;

  constructor(private userService: UserService, private cookieService: CookieService) { }

  ngOnInit() {
    if (this.cookieService.get('usersCookie')) {
      this.bool2 = true;
    } else this.bool1 = true;
  }

  GoToProfile() {
    this.userService.GoToProfile();
  }

}
