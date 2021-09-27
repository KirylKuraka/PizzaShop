import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/account';
import { Cart } from 'src/app/models/cart';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.scss']
})
export class OrderCreateComponent implements OnInit {
  account!: Account;

  public createOrderForm!: FormGroup;

  deliveryMethodSelect = new FormControl();
  deliveryMethods: string[] = ["1", "2", "3"];
  selectedDeliveryMethod = ''

  constructor(private dialogRef: MatDialogRef<OrderCreateComponent>,
              private as: AuthService,
              private router: Router) { }

  ngOnInit(): void {    
    let storageAccount = localStorage.getItem("account");
    if (storageAccount != null){
      this.account = Account.recoverAccount(storageAccount);
    }

    let firstName = this.account.firstName == "null" ? "" : this.account.firstName;
    let lastName = this.account.lastName == "null" ? "" : this.account.lastName;

    this.createOrderForm = new FormGroup({
      name: new FormControl(firstName + " " + lastName, [Validators.required]),
      phoneNumber: new FormControl(this.account.phoneNumber, [Validators.required]),
      comment: new FormControl('')
    })
  }

  public validateControl = (controlName: string) => {
    return this.createOrderForm.controls[controlName].invalid && this.createOrderForm.controls[controlName].touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.createOrderForm.controls[controlName].hasError(errorName)
  }

  public saveChanges = () => {
    alert(this.deliveryMethodSelect.value)
    this.dialogRef.close("Ok")
  }

  public get isLoggedIn(): boolean{
    return this.as.isAuthenticated();
  }

  public redirectToLogin(){
    this.router.navigateByUrl("/login")
    this.dialogRef.close();
  }

  public redirectToRegister(){
    this.router.navigateByUrl('/registration')
    this.dialogRef.close();
  }
}
