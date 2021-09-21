import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { ProductDataSource } from 'src/app/models/productDataSource';
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
  pageSize: number = 10
  pageIndex: number = 0
  sortOrder: string = "ProductName"
  filterType: string = ""

  dataSource!: ProductDataSource;
  columns = ['productType.productTypeName', 'productName', 'description', 'cost', 'promotionalPointsCost', 'details', 'update', 'delete']

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild("searchInput") search!: ElementRef;
  
  constructor(private productService: ProductService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataSource = new ProductDataSource(this.productService);
    this.dataSource.loadProducts(this.filterType, "", this.sortOrder, this.pageIndex + 1, this.pageSize)
  }

  ngAfterViewInit(): void {
    fromEvent(this.search.nativeElement, 'keyup')
    .pipe(
      debounceTime(150),
      distinctUntilChanged(),
      tap(() => {
        this.paginator.pageIndex = 0;
        this.dataSource.loadProducts(this.filterType, this.search.nativeElement.value, this.sortOrder, this.pageIndex + 1, this.pageSize)
      })
    )
    .subscribe();

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0)
  
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          this.dataSource.loadProducts(this.filterType, this.search.nativeElement.value, this.sort.active + " " + this.sort.direction, this.paginator.pageIndex + 1, this.paginator.pageSize)
        })
      )
      .subscribe();
  }

  openCreateDialog(): void{
    const dialogRef = this.dialog.open(ProductCreateComponent, {
      width: 'auto',
      height: 'auto'
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {  
        let product = new Product(result.productID,
                                  result.productName,
                                  result.description,
                                  result.cost,
                                  result.promotionalPointsCost,
                                  result.productTypeID)

        this.productService.createProduct(product)
          .subscribe(res => {
            this.pageIndex = 0;
            this.dataSource.loadProducts(this.filterType, "", this.sortOrder, this.pageIndex + 1, this.pageSize);
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
          this.productService.deleteProductById(product.productID)
            .subscribe(res => {
              this.dataSource.loadProducts(this.filterType, this.search.nativeElement.value, this.sortOrder, this.paginator.pageIndex + 1, this.paginator.pageSize)
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
        this.productService.updateProductById(result.product.productID, result.product)
          .subscribe(res => {      
            this.dataSource.loadProducts(this.filterType, this.search.nativeElement.value, this.sortOrder, this.paginator.pageIndex + 1, this.paginator.pageSize)
          })
      }
    })
  }
}
