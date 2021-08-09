import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ProductDetailsComponent } from './product-details/product-details.component';

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
  
  constructor(private productService: ProductService,
              private dialog: MatDialog) { }

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
        })
    }
  }

  openDetailsDialog(product: Product): void{
    const dialogRef = this.dialog.open(ProductDetailsComponent, {
      width: 'auto',
      height: 'auto',
      data: {product : product}
    });

    dialogRef.afterClosed().subscribe(result => {
    })
  }

  openEditDialog(product: Product): void {
    const dialogRef = this.dialog.open(ProductDetailsComponent, {
      width: 'auto',
      height: 'auto',
      data: {product : product}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        let index = this.dataSource.data.findIndex((item) => {
          return item.productID == result.product.productID
        })

        this.dataSource.data[index] = result.product;
        this.productService.updateProductById(result.product.productID, result.product)
          .subscribe(res => {      
          })
      }
    })
  }
}
