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
    logemail: new FormControl('',[
      Validators.required,
      Validators.email
    ]),
    logpassword: new FormControl('',[
      Validators.required
    ])
  });

  ngOnInit() {
  }

  login(): void {

    console.log(this.logData.value);
    //{email: soto , password: soto}
    //this.authenticationService.authenticate(this.logData.value)

    //alert(`Thanks for submitting! Data: ${this.username} + ${this.password}`);

    // if (this.username && this.password) {
    //   this.authenticationService.authenticate(this.username, this.password).then(result => {
    //     console.log(result);
    //     if (result) {
    //       this.router.navigate(['register']);
    //     } else {
    //       alert("Something wrong");
    //     }
    //   });
    // } else {
    //   alert("Invalid credentials");
    // }
  }


}