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
  isEditAccount: boolean = false;
  constructor(private as: AuthService, private accountService: AccountService) { }

  ngOnInit(): void {
    let accountString = localStorage.getItem("account");
    if (accountString != null) {
      this.account = Account.recoverAccount(accountString);
    }
  }

  logout() {
      this.as.logout()
    }
  
  changeStateEditAccount() {
    this.isEditAccount = !this.isEditAccount;
  }

  saveChanges(firstName: string, lastName: string, username: string, email: string, phone: string){
    this.account.firstName = firstName;
    this.account.lastName = lastName;
    this.account.userName = username;
    this.account.email = email;
    this.account.phoneNumber = phone;

    this.accountService.updateAccountById(this.account.userID, this.account) 
      .subscribe(res => {
      })
    this.changeStateEditAccount();
  }

  cancel(){
    this.changeStateEditAccount();
  }
}
