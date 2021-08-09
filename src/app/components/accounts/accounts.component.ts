import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Account } from 'src/app/models/account';
import { AccountService } from 'src/app/services/account.service';
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
  public showFlag: boolean = false;
  
  public dataSource = new MatTableDataSource<Account>();
  columns = ['firstName', 'lastName', 'userName', 'email', 'phone', 'pPoints', 'role', 'details', 'update', 'delete']

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private accountService: AccountService,
              private dialog: MatDialog
              ) { }

  ngOnInit(): void {
    this.accountService.getAccounts()
      .subscribe(res => {
        this.dataSource.data = res as Account[]
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
        return item.userID != id;
      })

      this.accountService.deleteAccountById(id)
        .subscribe(res => {
        })
    }
  }

  openDetailsDialog(account: Account): void{
    const dialogRef = this.dialog.open(AccountDetailsComponent, {
      width: '600px',
      height: '476px',
      data: {account : account}
    });

    dialogRef.afterClosed().subscribe(result => {
    })
  }

  openEditDialog(account: Account): void{
    const dialogRef = this.dialog.open(AccountEditComponent, {
      width: '600px',
      height: '600px',
      data: {account: account}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        let index = this.dataSource.data.findIndex((item) => {
          return item.userID == result.account.userID
        })
  
        this.dataSource.data[index] = result.account;
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
