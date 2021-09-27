import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Account } from 'src/app/models/account';
import { AccountDataSource } from 'src/app/models/accountDataSource';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import { AccountDeleteComponent } from './account-delete/account-delete.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { AccountEditComponent } from './account-edit/account-edit.component';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit, AfterViewInit {
  rolesSelect = new FormControl();
  rolesList: string[] = ['Admin', 'Customer'];
  selectedRole = ['']

  account!: Account;
  
  pageSize: number = 10
  pageIndex: number = 0
  sortOrder: string = "UserName"

  dataSource!: AccountDataSource;
  columns = ['firstName', 'lastName', 'userName', 'email', 'phoneNumber', 'promotionalPoins', 'role', 'details', 'update', 'delete']

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild("searchInput") search!: ElementRef;

  constructor(private accountService: AccountService,
              private authService: AuthService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataSource = new AccountDataSource(this.accountService, this.authService);
    this.dataSource.loadAccounts("", this.sortOrder, this.pageIndex + 1, this.pageSize)
  }

  ngAfterViewInit(): void {
    fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.dataSource.loadAccounts(this.search.nativeElement.value, this.sortOrder, this.pageIndex + 1, this.pageSize)
        })
      )
      .subscribe();

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0)
    
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          this.dataSource.loadAccounts(this.search.nativeElement.value, this.sort.active + " " + this.sort.direction, this.paginator.pageIndex + 1, this.paginator.pageSize)
        })
      )
      .subscribe();
  }

  openDeleteDilog(account: Account): void {
    const dialogRef = this.dialog.open(AccountDeleteComponent, {
      width: 'auto',
      height: 'auto',
      data: {account: account}
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        if (result){
          this.accountService.deleteAccountById(account.userID)
          .subscribe(res => {
              this.dataSource.loadAccounts(this.search.nativeElement.value, this.sortOrder, this.paginator.pageIndex + 1, this.paginator.pageSize)
          });
        }
      }
    })
  }

  openDetailsDialog(account: Account): void{
    const dialogRef = this.dialog.open(AccountDetailsComponent, {
      width: 'auto',
      height: 'auto',
      data: {account : account}
    });

    dialogRef.afterClosed().subscribe(result => {
    })
  }

  openEditDialog(account: Account): void{
    const dialogRef = this.dialog.open(AccountEditComponent, {
      width: 'auto',
      height: 'auto',
      data: {account: account}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.accountService.updateAccountById(result.account.userID, result.account)
          .subscribe(res => {
          })
      }
    })
  }

  public canDelete(id: string, account: Account): boolean {
    let currentAccount;

    let storageAccount = localStorage.getItem("account");
    if (storageAccount != null) {
      currentAccount = Account.recoverAccount(storageAccount);
    }

    return (currentAccount?.userID != id && !account.role.includes("Admin")) ? true : false;
  }

  public canEditCurrentUser = (id: string) => {
    let currentAccount;

    let storageAccount = localStorage.getItem("account");
    if (storageAccount != null){
      currentAccount = Account.recoverAccount(storageAccount);
    }

    return (currentAccount?.userID != id) ? true : false;
  }
}
