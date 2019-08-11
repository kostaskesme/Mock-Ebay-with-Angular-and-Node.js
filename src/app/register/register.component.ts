import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  regData = new FormGroup({
    email: new FormControl([
      Validators.email,
      Validators.required
    ]),
    username: new FormControl([
      Validators.required
      //checkUnique()
    ]),
    password: new FormControl([
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(16)
    ]),
    passwordConfirm: new FormControl([
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(16)
      //checkpassword()
    ]),
    firstName: new FormControl([
      Validators.required,
      Validators.maxLength(25)
    ]),
    lastName: new FormControl([
      Validators.required,
      Validators.maxLength(25)
    ]),
    phoneNumber: new FormControl([
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10)
    ]),
    address: new FormControl([
      Validators.required 
    ])
  });


  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  onSumbit() {
    console.log('clicked');
    console.log(this.regData.value);
    //this.authenticationService.

  }
}
