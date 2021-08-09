import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Account } from 'src/app/models/account';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss']
})
export class AccountEditComponent implements OnInit {
  account: Account = new Account();

  rolesSelect = new FormControl();
  rolesList: string[] = ['Admin', 'Customer'];
  selectedRole = ['']

  constructor(private dialogRef: MatDialogRef<AccountEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {account: Account}) { }

  ngOnInit(): void {
    this.account = this.data.account
    this.selectedRole = this.account.role.split(" - ");
    this.rolesSelect.setValue(this.selectedRole)
  }

  public saveChanges = () => {
    if (this.selectedRole.length != 0) {
      this.account.role = this.selectedRole.join(" - ");
    }
    else {
      this.account.role = "Customer";
    }

    this.data.account = this.account

    this.dialogRef.close(this.data);
  }
}
