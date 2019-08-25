import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse-users',
  templateUrl: './browse-users.component.html',
  styleUrls: ['./browse-users.component.scss']
})
export class BrowseUsersComponent implements OnInit {

  constructor(private router: Router, private browseUsersService: UserService) { }

  displayedColumns: string[] = ['username', 'email', 'rating', 'approved', 'action'];
  userData: User[] = []

  ngOnInit() {
    this.browseUsersService.viewAllUsers().then(response => {
      if (response.found) {
        this.userData = Object.values(response.result);
      }
      else {
        console.log(response.message);
      }
    })
  }

  onClick(user: any) {
    this.router.navigate([`profile/${user._id}`]);
  }

}
