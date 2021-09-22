import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Cart } from 'src/app/models/cart';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.scss']
})
export class OrderCreateComponent implements OnInit {
  private cart!: Cart;
  text: string = "";

  constructor(private dialogRef: MatDialogRef<OrderCreateComponent>) { }

  ngOnInit(): void {
    this.cart = Cart.convertToObject();
    let cartJsonString = localStorage.getItem("cart")
    if (cartJsonString != null) {
      this.text = cartJsonString;
    }
    
  }

  public saveChanges = () => {
    this.dialogRef.close("Ok")
  }
}
