import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { OrderedProductService } from "../services/ordered-product.service";
import { OrderedProduct } from "./orderedProduct";

export class orderedProductDataSource implements DataSource<OrderedProduct> {
    totalCount: number = 0;
    private orderedProductsSubject = new BehaviorSubject<OrderedProduct[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading = this.loadingSubject.asObservable();

    constructor(private orderedProductService: OrderedProductService) {}

    connect(collectionViewer: CollectionViewer): Observable<OrderedProduct[]> {
        return this.orderedProductsSubject.asObservable()
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.orderedProductsSubject.complete();
        this.loadingSubject.complete();
    }

    loadOrders(filter: string = "", search: string = "", sort: string = "order.orderdate", pageIndex: number = 1, pageSize: number = 10){
        this.loadingSubject.next(true);

        this.orderedProductService.getOrderedProducts(filter, search, sort, pageIndex, pageSize).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe((response: any) => {
            this.orderedProductsSubject.next(response.body.products)
            this.totalCount = response.body.totalCount
        })
    }
}