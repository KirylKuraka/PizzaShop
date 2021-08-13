import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/account';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{
  isLoginError: boolean = false;
  @ViewChild('username')usernameInput!: ElementRef;

  hide = true;

  showSpinner = false;
  public get isLoggedIn(): boolean{
    return this.as.isAuthenticated();
  }

  constructor(private as: AuthService, private accountService: AccountService, private router: Router){

  }

  login(username: string, password: string){
    this.showSpinner = true;

    this.as.login(username, password)
      .subscribe(res => {
        this.accountService.getAccount()
        .subscribe(res => {
          let account = res as Account;

          let role = localStorage.getItem("currentUserRole")
          if (role != null) {
            account.role = role
          }
           
          localStorage.setItem("account", Account.convertAccountToString(account));
          localStorage.setItem("currentAccountName", account.userName)

          this.isLoginError = false;
        })

        this.navigateToHome();
      }, err => {
        this.showSpinner = false;
        this.isLoginError = true;
        this.usernameInput.nativeElement.focus();
      })
  }

  navigateToHome(): void{
    this.router.navigateByUrl('');
  }

}
