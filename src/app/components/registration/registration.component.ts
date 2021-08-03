import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserForRegistrationDTO } from 'src/app/models/userForRegistrationDTO';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public registrationForm!: FormGroup;

  constructor(private as: AuthService, private router: Router) {
    
  }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      userName: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      passwordConfirm: new FormControl(''),
      phoneNumber: new FormControl('')
    })
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

    console.log(user);

    if (user.password == formValues.passwordConfirm) {
      this.as.registration(user)
      .subscribe(res => {
        console.log("Succesful registration")
        this.navigateToLogin();
      },
      err => {
        alert("There was a problem during registration. \nCheck the entered data.")
      })
    }
    else {
      alert("ERROR \nPassword must match!")
    }
    
  }

  navigateToLogin(): void{
    this.router.navigateByUrl('/login');
  }
}
