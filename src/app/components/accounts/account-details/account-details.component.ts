import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Account } from 'src/app/models/account';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {
  account: Account = new Account();

  constructor(private dilogRef: MatDialogRef<AccountDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) private data: {account: Account}
              ) { }

  ngOnInit(): void {
    this.account = this.data.account
  }

  onNoClick(): void {
    this.dilogRef.close();
  }
}
