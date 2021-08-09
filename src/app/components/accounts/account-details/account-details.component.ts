import { Component, Inject, OnInit } from '@angular/core';
//import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/account';
//import { DialogData } from 'src/app/models/dialogData';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {
  account: Account = new Account();

  constructor(private accountService: AccountService, 
              private router: Router, 
              //private dilogRef: MatDialogRef<AccountDetailsComponent>,
              //@Inject(MAT_DIALOG_DATA) private data: DialogData
              ) { }

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

  // onNoClick(): void {
  //   this.dilogRef.close();
  // }
}
