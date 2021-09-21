import { Product } from "./product";
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { ProductService } from "../services/product.service";

export class ProductDataSource implements DataSource<Product> {

    totalCount: number = 0;
    private productsSubject = new BehaviorSubject<Product[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading = this.loadingSubject.asObservable();

    constructor(private productService: ProductService) {}

    connect(collectionViewer: CollectionViewer): Observable<Product[]> {
        return this.productsSubject.asObservable()
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.productsSubject.complete();
        this.loadingSubject.complete();
    }

    loadProducts(filter: string = "", search: string = "", sort: string = "productname", pageIndex: number = 1, pageSize: number = 10){
        this.loadingSubject.next(true);

        this.productService.getProducts(filter, search, sort, pageIndex, pageSize).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe((response: any) => {
            this.productsSubject.next(response.body.products)
            this.totalCount = response.body.totalCount
        })
    }

}