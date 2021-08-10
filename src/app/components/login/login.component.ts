import { Component, OnInit } from '@angular/core';
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

  public get isLoggedIn(): boolean{
    return this.as.isAuthenticated();
  }

  constructor(private as: AuthService, private accountService: AccountService, private router: Router){

  }

  login(username: string, password: string){
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
          
          this.navigateToHome();
        })
      }, err => {
        alert('Wrong login or password');
        console.error('Wrong login or password')
      })
  }

  navigateToHome(): void{
    this.router.navigateByUrl('');
  }

}
