import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { CartItem } from 'src/app/models/cartItem';
import { OrderCreateComponent } from '../orders/order-create/order-create.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public dataSource = new MatTableDataSource<CartItem>();
  columns = ['delete', 'picture', 'productName', 'cost', 'quantity']

  cart: Cart = new Cart();

  constructor(private router: Router,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.cart = Cart.convertToObject();

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

  redirectToHome(){
    this.router.navigateByUrl('');
  }

  createOrder(): void {
    const dialogRef = this.dialog.open(OrderCreateComponent, {
      width: 'auto',
      height: 'auto'
    })

    dialogRef.afterClosed().subscribe(result => {
      // if (result != null) {
      //   alert("Ok")
      // }
      // else{
      //   alert("Bad")
      // }
      // if (result != null) {  
      //   let product = new Product(result.productID,
      //                             result.productName,
      //                             result.description,
      //                             result.cost,
      //                             result.promotionalPointsCost,
      //                             result.productTypeID)

      //   this.productService.createProduct(product)
      //     .subscribe(res => {
      //       this.pageIndex = 0;
      //       this.dataSource.loadProducts(this.filterType, "", this.sortOrder, this.pageIndex + 1, this.pageSize);
      //     })
      // }
    })
  }

  cartIsEmpty() {
    return this.cart.items.length == 0;
  }
}
