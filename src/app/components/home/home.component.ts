import { AfterViewInit, Component, OnInit } from '@angular/core';
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
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProductsWithFilter("Пицца")
      .subscribe(res => {
        this.pizzas = res as Product[];
        console.log(this.pizzas);
      })
    
    this.productService.getProductsWithFilter("Напиток")
      .subscribe(res => {
        this.drinks = res as Product[];
        console.log(this.drinks);
      })

    this.productService.getProductsWithFilter("Соус")
      .subscribe(res => {
        this.sauces = res as Product[];
        console.log(this.sauces);
      })
  }
}
