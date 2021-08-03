import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/account';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-account-deatils',
  templateUrl: './account-deatils.component.html',
  styleUrls: ['./account-deatils.component.scss']
})
export class AccountDeatilsComponent implements OnInit {
  account!: Account;

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    let id = localStorage.getItem("accountDetailsID")
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
