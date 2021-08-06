import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, AfterViewInit {
  public dataSource = new MatTableDataSource<Product>();
  columns = ['productTypeName', 'productName', 'description', 'cost', 'promotionalPointsCost', 'details', 'update', 'delete']

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productService.getProducts()
      .subscribe(res => {
        this.dataSource.data = res as Product[]
        console.log(this.dataSource.data);
      }) 
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (event: Event) => {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
  }

  public redirectToDelete = (id: string) => {
    if (confirm("Вы уверены, что хотите удалить выбранную запись?")) {
      this.dataSource.data = this.dataSource.data.filter((item) => {
        return item.productID != id;
      })

      this.productService.deleteProductById(id)
        .subscribe(res => {
          console.log(res)
        })
    }
  }

  public redirectToDetails = (id: string) => {
      localStorage.setItem('id', id)
      console.log(localStorage.getItem('id'));
      this.productService.getProductById(id).subscribe(res => {console.log(res)})

  }

  public redirectToUpdate = (id: string, product: Product) => {

  }
}
