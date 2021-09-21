import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { CartItem } from 'src/app/models/cartItem';
import { Product } from 'src/app/models/product';
import { ProductType } from 'src/app/models/productType';
import { ProductTypeService } from 'src/app/services/product-type.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  search: string = ""
  sort: string = ""
  pageNumber: number = 1;
  pageSize: number = 50;

  pizzas: Product[] = [];
  sauces: Product[] = [];
  drinks: Product[] = [];

  productTypeNames: string[] = [];

  cart: Cart = new Cart();
  constructor(private productService: ProductService,
              private productTypeService: ProductTypeService) { }

  ngOnInit(): void {
    this.cart = Cart.convertToObject();
  
    this.productService.getProducts("Пицца", this.search, this.sort, this.pageNumber, this.pageSize)
      .subscribe((response: any) => {
        this.pizzas = response.body.products;
      })
    
    this.productService.getProducts("Напиток", this.search, this.sort, this.pageNumber, this.pageSize)
      .subscribe((response: any) => {
        this.drinks = response.body.products;
      })

    this.productService.getProducts("Соус", this.search, this.sort, this.pageNumber, this.pageSize)
      .subscribe((response: any) => {
        this.sauces = response.body.products;
      })

    this.productTypeService.getProductTypes()
      .subscribe(response => {
        this.productTypeNames = (response as ProductType[]).map(value => value.productTypeName);
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
