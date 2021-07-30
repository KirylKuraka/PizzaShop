import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/models/account';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  account!: Account;
  
  constructor(private accountService: AccountService, private as: AuthService) { }

  ngOnInit(): void {
    this.accountService.getAccount()
      .subscribe(res => {
        this.account = res;
        console.log(this.account);
      })
  }

  logout() {
      this.as.logout()
    }

    // public get isHaveData(): boolean{
    //   return this.account != null;
    // }
}
