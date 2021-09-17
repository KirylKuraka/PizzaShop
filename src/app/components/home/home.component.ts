import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { CartItem } from 'src/app/models/cartItem';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pizzas: Product[] = [];
  sauces: Product[] = [];
  drinks: Product[] = [];
  cart: Cart = new Cart();
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.cart = Cart.convertToObject();
  
    this.productService.getProductsWithFilter("Пицца")
      .subscribe(res => {
        this.pizzas = res as Product[];
      })
    
    this.productService.getProductsWithFilter("Напиток")
      .subscribe(res => {
        this.drinks = res as Product[];
      })

    this.productService.getProductsWithFilter("Соус")
      .subscribe(res => {
        this.sauces = res as Product[];
      })
  }

  addToCart(product: Product): void {
    let index: number = this.cart.items.findIndex((element) => 
      element.product.productID == product.productID
    )
    
    if (index == -1) {
      this.cart.addItem(new CartItem(product));
      Cart.convertToJSON(this.cart);
    }
  }
}
