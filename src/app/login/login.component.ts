import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/enviroment.local';
import { Router } from '@angular/router';
import { HttpClient } from 'selenium-webdriver/http';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authenticationService: AuthenticationService, private cookieService: CookieService) { }

  cookieValue = 'UNKNOWN'

  cookieValueJSON = {
    id: 0,
    username: 'unavailable',
    type: -1,
    approved: false,
  };

  logData = new FormGroup({
    username: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });

  updateUserCookie(user) {
    this.cookieValueJSON = {
      id: user._id,
      username: user.username,
      type: user.type,
      approved: user.approved
    }
    this.cookieValue = JSON.stringify(this.cookieValueJSON);
    this.cookieService.set('usersCookie', this.cookieValue);
  }

  ngOnInit() {
  }

  login(): void {
    //db.users.updateOne({'username': 'admin'},{$set :{'type': 0}}) //command to set admin type in mongo shell

    console.log(this.logData.value);
    if (this.logData.value.username && this.logData.value.username) {
      this.authenticationService.authenticate(this.logData.value).then(result => {
        console.log(result);
        if (result.isLoggedIn) {
          if(this.cookieService.check('usersCookie')){
            this.cookieService.delete('usersCookie');
          }
          this.updateUserCookie(result.user);
          if (this.cookieValueJSON.type === 0) {
            this.router.navigate(['viewUser']);
          }
          else {
            if (this.cookieValueJSON.approved) {
              this.router.navigate([`profile/${this.cookieValueJSON.id}`]);
            }
            else {
              alert('You are not approved yet! Try again later');
              this.cookieService.delete('usersCookie');
              location.reload();
            }
          }

        } else {
          alert("Invalid credentials");
        }
      });
    } else {
      alert("Both elements are required");
    }
  }


}