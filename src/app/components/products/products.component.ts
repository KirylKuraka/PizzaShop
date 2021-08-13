import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductType } from 'src/app/models/productType';
import { ProductService } from 'src/app/services/product.service';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductDeleteComponent } from './product-delete/product-delete.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, AfterViewInit {
  public dataSource = new MatTableDataSource<Product>();
  columns = ['productType.productTypeName', 'productName', 'description', 'cost', 'promotionalPointsCost', 'details', 'update', 'delete']

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private productService: ProductService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.productService.getProducts()
      .subscribe(res => {
        this.dataSource.data = res as Product[]
      }) 
  }

  ngAfterViewInit(): void {
    // this.dataSource.sortingDataAccessor = (item, property) => {
    //   switch(property) {
    //     case 'productType.productTypeName': return item.productType.productTypeName;
    //     default: return item[property];
    //   }
    // };

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (event: Event) => {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
  }

  openCreateDialog(): void{
    const dialogRef = this.dialog.open(ProductCreateComponent, {
      width: 'auto',
      height: 'auto'
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {  
        this.dataSource.data = this.dataSource.data.concat([result])

        let product = new Product(result.productID,
                                  result.productName,
                                  result.description,
                                  result.cost,
                                  result.promotionalPointsCost,
                                  result.productTypeID)

        this.productService.createProduct(product)
          .subscribe(res => {
          })
      }
    })
  }

  openDeleteDialog(product: Product): void {
    const dialogRef = this.dialog.open(ProductDeleteComponent, {
      width: 'auto',
      height: 'auto',
      data: {product: product}
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        if (result){
          this.dataSource.data = this.dataSource.data.filter((item) => {
            return item.productID != product.productID;
          })
    
          this.productService.deleteProductById(product.productID)
            .subscribe(res => {
            })
        }
      }
    })
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
    const dialogRef = this.dialog.open(ProductEditComponent, {
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
