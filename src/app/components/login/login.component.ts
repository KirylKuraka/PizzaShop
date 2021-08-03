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

          localStorage.setItem("account", this.convertAccountToString(account));

          if (account.role.trim().split(" - ").includes("Admin")) {
            alert("You're authorized as Admin")
            localStorage.setItem("isAdmin", "true")
          }
          else {
            localStorage.setItem("isAdmin", "false")
          }
          
          this.navigateToHome();
          console.log(account);
        })
      }, err => {
        alert('Wrong login or password');
        console.log('Wrong login or password')
      })
  }

  logout() {
    this.as.logout()
  }

  convertAccountToString(a: Account): string{
    return a.userID + ";" + a.firstName + ";" + a.lastName + ";" + a.userName + ";" +
      a.email + ";" + a.phoneNumber + ";" + a.promotionalPoins + ";" + a.role;
  }

  navigateToHome(): void{
    this.router.navigateByUrl('');
  }

}
