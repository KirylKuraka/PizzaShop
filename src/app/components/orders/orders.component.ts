import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { OrderedProduct } from 'src/app/models/orderedProduct';
import { orderedProductDataSource } from 'src/app/models/orderedProductDataSource';
import { OrderedProductService } from 'src/app/services/ordered-product.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, AfterViewInit {
  pageSize: number = 10
  pageIndex: number = 0
  sortOrder: string = "OrderDate"
  filterType: string = ""

  dataSource!: orderedProductDataSource;
  columns = ['order.orderDate', 'productType.productTypeName', 'productName', 'quantity', 'totalCost', 'order.customer.customerName',
             'order.deliveryMethod.deliveryMethodName', 'order.paymentMethod.paymentMethodName', 'order.orderStatus.orderStatusName',
             'details', 'update', 'delete']

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild("searchInput") search!: ElementRef;

  constructor(private orderedProductsService: OrderedProductService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataSource = new orderedProductDataSource(this.orderedProductsService);
    this.dataSource.loadOrders(this.filterType, "", this.sortOrder, this.pageIndex + 1, this.pageSize)
  }

  ngAfterViewInit(): void {
    fromEvent(this.search.nativeElement, 'keyup')
    .pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => {
        this.paginator.pageIndex = 0;
        this.dataSource.loadOrders(this.filterType, this.search.nativeElement.value, this.sortOrder, this.pageIndex + 1, this.pageSize)
      })
    )
    .subscribe();

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0)
  
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          this.dataSource.loadOrders(this.filterType, this.search.nativeElement.value, this.sort.active + " " + this.sort.direction, this.paginator.pageIndex + 1, this.paginator.pageSize)
        })
      )
      .subscribe();
  }

  openDeleteDialog(orderedProduct: OrderedProduct): void {
    // const dialogRef = this.dialog.open(ProductDeleteComponent, {
    //   width: 'auto',
    //   height: 'auto',
    //   data: {product: product}
    // })

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result != null) {
    //     if (result){
    //       this.productService.deleteProductById(product.productID)
    //         .subscribe(res => {
    //           this.dataSource.loadProducts(this.filterType, this.search.nativeElement.value, this.sortOrder, this.paginator.pageIndex + 1, this.paginator.pageSize)
    //         })
    //     }
    //   }
    // })
  }

  openDetailsDialog(orderedProduct: OrderedProduct): void{
    // const dialogRef = this.dialog.open(ProductDetailsComponent, {
    //   width: 'auto',
    //   height: 'auto',
    //   data: {product : product}
    // });

    // dialogRef.afterClosed().subscribe(result => {
    // })
  }

  openEditDialog(orderedProduct: OrderedProduct): void {
    // const dialogRef = this.dialog.open(ProductEditComponent, {
    //   width: 'auto',
    //   height: 'auto',
    //   data: {product : product}
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result != null) {
    //     this.productService.updateProductById(result.product.productID, result.product)
    //       .subscribe(res => {      
    //         this.dataSource.loadProducts(this.filterType, this.search.nativeElement.value, this.sortOrder, this.paginator.pageIndex + 1, this.paginator.pageSize)
    //       })
    //   }
    // })
  }
}
