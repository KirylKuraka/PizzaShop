import { Component } from '@angular/core';
import { AuthService } from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PizzaShop';

  public get isLoggedIn(): boolean{
    return this.as.isAuthenticated();
  }

  constructor(private as: AuthService){

  }

  login(username: string, password: string){
    this.as.login(username, password)
      .subscribe(res => {

      }, err => {
        console.log('Wrong login or password')
      })
  }

  logout() {
    this.as.logout()
  }
}
