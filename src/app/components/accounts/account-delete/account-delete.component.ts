import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Account } from 'src/app/models/account';

@Component({
  selector: 'app-account-delete',
  templateUrl: './account-delete.component.html',
  styleUrls: ['./account-delete.component.scss']
})
export class AccountDeleteComponent implements OnInit {
  account: Account = new Account();
  constructor(private dilogRef: MatDialogRef<AccountDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {account: Account}) { }

  ngOnInit(): void {
    this.account = this.data.account
  }

  onDeleteClick() {
    this.dilogRef.close(true);
  }

  onNoClick(): void {
    this.dilogRef.close(false);
  }
}
