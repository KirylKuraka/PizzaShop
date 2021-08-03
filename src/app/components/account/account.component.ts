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
      this.account = this.recoverAccount(accountString);
      console.log(this.account);
    }
  }

  recoverAccount(input: string): Account{
    let tempData = input.trim().split(";");

    let result: Account = new Account();
    result.userID = tempData[0];
    result.firstName = tempData[1];
    result.lastName = tempData[2];
    result.userName = tempData[3];
    result.email = tempData[4];
    result.phoneNumber = tempData[5];
    result.promotionalPoins = Number(tempData[6]);
    result.role = tempData[7];

    return result;
  }

  logout() {
      this.as.logout()
    }
}
