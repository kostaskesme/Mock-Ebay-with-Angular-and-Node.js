import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  cookieValue = 'UNKNOWN';

  cookieValueJSON = {
    id: 0,
    username: 'unavailable',
    type: -1,
    approved: false,
    rating: 0,
    location: 'unavailable',
    country: 'unavailable'
  };

  logData = new FormGroup({
    username: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });

  submitted: boolean = false;
  bool1: boolean;
  bool2: boolean;

  updateUserCookie(user) {
    this.cookieValueJSON = {
      id: user._id,
      username: user.username,
      type: user.type,
      approved: user.approved,
      rating : user.rating,
      location : user.location,
      country : user.country
    }
    this.cookieValue = JSON.stringify(this.cookieValueJSON);
    this.cookieService.set('usersCookie', this.cookieValue);
  }

  ngOnInit() {
    this.bool1 = this.logData.controls.username.errors.required;
    this.bool2 = this.logData.controls.password.errors.required;
  }

  login(): void {
    this.submitted = true;
    if (this.logData.invalid) {
      //console.log("went in");
      return;
    }

    this.authenticationService.authenticate(this.logData.value).then(result => {
      if (result.isLoggedIn) {
        if (this.cookieService.check('usersCookie')) {
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
  }


}
