import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/account';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {
  account: Account = new Account();

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    let id = localStorage.getItem("id")
    if (id != null) {
      this.accountService.getAccountById(id)
        .subscribe(res => {
          this.account = res
        })
    }
  }

  goBack(){
    this.router.navigateByUrl('accounts')
  }
}
