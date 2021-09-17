import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Cart } from 'src/app/models/cart';
import { CartItem } from 'src/app/models/cartItem';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public dataSource = new MatTableDataSource<CartItem>();
  columns = ['delete', 'picture', 'productName', 'cost']

  cart: Cart = new Cart();
  text: string = "";

  constructor() { }

  ngOnInit(): void {
    this.cart = Cart.convertToObject();
    this.text = JSON.stringify(this.cart);

    this.dataSource.data = this.cart.items
  }

  removeItemFromCart(item: CartItem): void {
    this.cart.removeItem(item);
  }
}
