import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/enviroment.local';
import { Router } from '@angular/router';
import { HttpClient } from 'selenium-webdriver/http';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authenticationService: AuthenticationService) { }


  logData = new FormGroup({
    username: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });

  ngOnInit() {
  }

  login(): void {

    console.log(this.logData);
    if (this.logData.value.username && this.logData.value.username) {
      this.authenticationService.authenticate({ username: this.logData.value.username, password: this.logData.value.password }).then(result => {
        console.log(result);
        if (result.isLoggedIn) {
          this.router.navigate([`profile/${result.id}`]);
        } else {
          alert("Something wrong");
        }
      });
    } else {
      alert("Invalid credentials");
    }
  }


}