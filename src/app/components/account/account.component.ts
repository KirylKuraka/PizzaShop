import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/models/account';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  account!: Account;
  
  constructor(private as: AuthService) { }

  ngOnInit(): void {
    let accountString = localStorage.getItem("account");
    if (accountString != null) {
      this.account = Account.recoverAccount(accountString);
      console.log(this.account);
    }
  }

  logout() {
      this.as.logout()
    }
}
