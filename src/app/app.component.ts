import { AfterViewInit, Component } from '@angular/core';
import { Account } from './models/account';
import { AccountService } from './services/account.service';
import { AuthService } from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'PizzaShop';

  public get isLoggedIn(): boolean{
    return this.as.isAuthenticated();
  }

  public get isAdmin(): boolean {
    return localStorage.getItem("isAdmin") == "true";
  }
  constructor(private as: AuthService){
  }

  public get AccountName(): string {
    let name = localStorage.getItem("currentAccountName");
    return name != null ? `Hello, ${name}` : "";
  }
}
