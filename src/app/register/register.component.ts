import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { dropdownValues } from './countries';


const passwordConfirmation: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const passwordConfirm = control.get('passwordConfirm');
  if (password.value === passwordConfirm.value)
    return null;
  else
    return { 'passwordsMatch': false };
};


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  regData = new FormGroup({
    email: new FormControl('', [
      Validators.email,
      Validators.required
    ]),
    username: new FormControl('', [
      Validators.required
      //checkUnique()
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(16)
    ]),
    passwordConfirm: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(16)
    ]),
    firstName: new FormControl('', [
      Validators.required,
      Validators.maxLength(25)
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.maxLength(25)
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10)
    ]),
    address: new FormControl('', [
      Validators.required
    ]),
    location: new FormControl('', [
      Validators.required
    ]),
    country: new FormControl('Greece', [
      Validators.required
    ]),
    afm: new FormControl('', [
      Validators.required
    ])
  }, { validators: passwordConfirmation });

  countries = dropdownValues;



  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  onSumbit() {

    var registerData = this.regData.value;
    registerData.rating = "0";
    registerData.type = "1";
    registerData.approved = "false";
    delete registerData.passwordConfirm;


    console.log(registerData);
    this.authenticationService.register(registerData).then(response => {
      if (response) {
        console.log(response);
        this.router.navigate(['pendingApproval']);
      }
      else {
        console.log(response.message)
      }
    })

  }

}
