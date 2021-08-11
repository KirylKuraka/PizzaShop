import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  notUnique: boolean = false;
  @ViewChild('userName')usernameInput!: ElementRef;

  public editAccountForm!: FormGroup;

  constructor(private as: AuthService, private accountService: AccountService) { }

  ngOnInit(): void {
    let accountString = localStorage.getItem("account");
    if (accountString != null) {
      this.account = Account.recoverAccount(accountString);
    }

    this.editAccountForm = new FormGroup({
      firstName: new FormControl(this.account.firstName != "null" ? this.account.firstName : ''),
      lastName: new FormControl(this.account.lastName != "null" ? this.account.lastName : ''),
      userName: new FormControl(this.account.userName, [Validators.required]),
      email: new FormControl(this.account.email, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(this.account.phoneNumber, [Validators.required])
    })
  }

  public validateControl = (controlName: string) => {
    return this.editAccountForm.controls[controlName].invalid && this.editAccountForm.controls[controlName].touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.editAccountForm.controls[controlName].hasError(errorName)
  }

  logout() {
      this.as.logout()
    }
  
  changeStateEditAccount() {
    this.isEditAccount = !this.isEditAccount;
  }

  public saveChanges = (editAccountFormValue: any) => {
    let formValues = {...editAccountFormValue}

    this.account.firstName = formValues.firstName;
    this.account.lastName = formValues.lastName;
    this.account.userName = formValues.userName;
    this.account.email = formValues.email;
    this.account.phoneNumber = formValues.phoneNumber;

    this.as.checkUsername(this.account.userID, this.account.userName)
      .subscribe(res => {
        if (!res) {
          this.accountService.updateAccountById(this.account.userID, this.account) 
            .subscribe(res => {
            })
          localStorage.setItem("account", Account.convertAccountToString(this.account))
          localStorage.setItem("currentAccountName", this.account.userName)

          this.changeStateEditAccount();
        }
        else{
          this.notUnique = true;
          this.usernameInput.nativeElement.focus();
        }
      })
  }

  cancel(){
    this.changeStateEditAccount();
  }
}
