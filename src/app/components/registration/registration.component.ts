import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserForRegistrationDTO } from 'src/app/models/userForRegistrationDTO';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  @ViewChild('userName')usernameInput!: ElementRef;

  passwordHide = true;
  confirmHide = true;
  
  public registrationForm!: FormGroup;

  constructor(private as: AuthService, private router: Router) {
    
  }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(8)]),
      phoneNumber: new FormControl('', [Validators.required])
    })
  }

  public validateControl = (controlName: string) => {
    return this.registrationForm.controls[controlName].invalid && this.registrationForm.controls[controlName].touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.registrationForm.controls[controlName].hasError(errorName)
  }

  public registrate = (registerFormValue: any) => {
    let formValues = {...registerFormValue}

    let user: UserForRegistrationDTO = {
      userName: formValues.userName,
      email: formValues.email,
      password: formValues.password,
      phoneNumber: formValues.phoneNumber,
      roles: ['Customer']
    }


    if (this.matchPasswords(user.password, formValues.passwordConfirm)) {
      this.as.registration(user)
      .subscribe(res => {
        this.navigateToLogin();
      },
      err => {        
        this.usernameInput.nativeElement.focus();
        this.registrationForm.controls["userName"].setErrors({
          notUnique: true
        });
      })
    }
    else {
      alert("ERROR \nPassword must match!")
    }
    
  }

  navigateToLogin(): void{
    this.router.navigateByUrl('/login');
  }

  matchPasswords(password: string, passwordConfigrm: string): boolean {
    return password == passwordConfigrm ? true : false
  }
}
