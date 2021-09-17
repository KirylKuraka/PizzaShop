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
  columns = ['delete', 'picture', 'productName', 'cost', 'quantity']

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
    this.dataSource.data = this.cart.items
    Cart.convertToJSON(this.cart);
  }

  decreaseQuantity(item: CartItem): void {
    let index: number = this.cart.items.findIndex((element) =>
      element.product.productID == item.product.productID
    )

    if (this.cart.items[index].quantity > 1) {
      this.cart.items[index].quantity--;
    }

    Cart.convertToJSON(this.cart);
  }

  increaseQuantity(item: CartItem): void {
    let index: number = this.cart.items.findIndex((element) => 
      element.product.productID == item.product.productID
    )

    this.cart.items[index].quantity++;

    Cart.convertToJSON(this.cart);
  }

  getTotalSum(): number {
    return this.cart.getTotalSum();
  }
}
