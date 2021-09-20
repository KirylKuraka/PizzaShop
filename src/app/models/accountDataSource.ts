import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { AccountService } from "../services/account.service";
import { AuthService } from "../services/auth.service";
import { Account } from "./account";
import { Role } from "./role";

export class AccountDataSource implements DataSource<Account> {

    totalCount: number = 0;
    private accounsSubject = new BehaviorSubject<Account[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading = this.loadingSubject.asObservable();

    constructor(private accountService: AccountService,
                private authService: AuthService) {}

    connect(collectionViewer: CollectionViewer): Observable<Account[]> {
        return this.accounsSubject.asObservable()
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.accounsSubject.complete();
        this.loadingSubject.complete();
    }

    loadAccounts(search: string = "", sort: string = "UserName", pageIndex: number = 1, pageSize: number = 10){
        this.loadingSubject.next(true);

        this.accountService.getAccounts(search, sort, pageIndex, pageSize).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe((response: any) => {
            let temp: Account[] = response.body.accounts;

            // for (let i = 0; i < temp.length; i++) {
            //     this.authService.getUserRoleById(temp[i].userID)
            //       .subscribe(res => {
            //         temp[i].role = (res as Role).role
            //     })
            //   }
            
            this.accounsSubject.next(response.body.accounts)
            this.totalCount = response.body.totalCount
        })
    }

}