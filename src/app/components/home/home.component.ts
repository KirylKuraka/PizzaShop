import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  pizzas: Product[] = [];
  sauces: Product[] = [];
  drinks: Product[] = [];
  constructor(private productService: ProductService) { }

  ngAfterViewInit(): void {
    //console.log(this.products)
  }

  ngOnInit(): void {
    this.productService.getProductsWithFilter("Пицца")
      .subscribe(res => {
        this.pizzas = res as Product[];
        this.generateProductPartHTML("Пиццы", this.pizzas);
        console.log(this.pizzas);
      })
    
    this.productService.getProductsWithFilter("Напиток")
      .subscribe(res => {
        this.drinks = res as Product[];
        this.generateProductPartHTML("Напитки", this.drinks);
        console.log(this.drinks);
      })

    this.productService.getProductsWithFilter("Соус")
      .subscribe(res => {
        this.sauces = res as Product[];
        this.generateProductPartHTML("Соусы", this.sauces);
        console.log(this.sauces);
      })
  }
  
  private generateProductPartHTML(title: string, products: Product[]) {
    var mainDiv = document.getElementById("products-div")

    let titleDiv = document.createElement('div');
    titleDiv.innerHTML = title;
    titleDiv.className = 'title-block';
    mainDiv?.appendChild(titleDiv);

    let wrapperDiv = document.createElement('div');
    wrapperDiv.className = 'wrapper';
    mainDiv?.appendChild(wrapperDiv);

    for (let i = 0; i < products.length; i++) {
      let divCartBox = document.createElement('div');
      divCartBox.className = 'cart-box';
      divCartBox.setAttribute('itemptype', 'Product');
      divCartBox.toggleAttribute('itemscope');

      let imageLogo = document.createElement('img');
      imageLogo.className = 'image-icon';
      imageLogo.src = "../../../assets/pizza.png";
      imageLogo.setAttribute('itemprop', 'image');
      divCartBox.appendChild(imageLogo);

      let h3 = document.createElement('h3');
      h3.setAttribute('itemprop', 'name');
      h3.innerHTML = `${products[i].productName}`;
      divCartBox.appendChild(h3);

      let p = document.createElement('p');
      p.innerHTML = `Описание: ${products[i].description}`;
      divCartBox.appendChild(p);

      let form = document.createElement('form');
      form.action = "something";
      form.method = "POST";

      let priceBoxDiv = document.createElement('div');
      priceBoxDiv.className = "price-box";

      let priceSpan = document.createElement('span');
      priceSpan.innerHTML = `Стоимость: ${products[i].cost} руб`;
      priceBoxDiv.appendChild(priceSpan);

      let cartButton = document.createElement('button');
      cartButton.innerHTML = "В корзину";
      form.appendChild(priceBoxDiv);
      form.appendChild(cartButton);

      divCartBox.appendChild(form);

      wrapperDiv.appendChild(divCartBox);
    }
  }
}
