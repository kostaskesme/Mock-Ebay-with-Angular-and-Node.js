import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user.type';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  approved: boolean;
  userData: User[];
  id: string = window.location.href.slice((window.location.href.lastIndexOf("/")) + 1);

  constructor(private route: ActivatedRoute, private profileService: UserService) {
    this.route.params.subscribe(params => console.log(params));
  }
  displayedColumns: string[] = ['email', 'username', 'firstName', 'lastName', 'phoneNumber',
    'address', 'location', 'country', 'afm', 'rating', 'approved', ' '];

  ngOnInit() {
    //this.id = window.location.href.slice((window.location.href.lastIndexOf("/")) + 1);
    this.profileService.profile(this.id).then(response => {
      if (response.found) {
        this.userData = [response.User];
        this.approved = response.User.approved;
      }
      else {
        console.log('cant find user!');
      }
    })
  }

  onClick() {
    if(this.approved){
      alert('User is already approved');
    }
    else{
      this.profileService.approve(this.id).then(response =>{
        if(response.found){
          alert('User approved!');
        }
        else{
          alert('error!');
        }
      })
    }
  }

}
