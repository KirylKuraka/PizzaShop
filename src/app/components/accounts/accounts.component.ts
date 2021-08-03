import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/account';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit, AfterViewInit {
  public dataSource = new MatTableDataSource<Account>();
  columns = ['id', 'firstName', 'lastName', 'userName', 'email', 'phone', 'pPoints', 'role', 'details', 'update', 'delete']

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private accountService: AccountService, private router: Router) { }

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

  public redirectToUpdate = (id: string, account: Account) =>{

  }

  public redirectToDelete = (id: string, account: Account) => {
    if (confirm("Вы уверены, что хотите удалить выбранную запись?")) {
      this.dataSource.data = this.dataSource.data.filter((item) => {
        return item.userID != id;
      })
  
      this.accountService.deleteAccountById(id)
        .subscribe(res => {
          console.log(res)
        })
    }
  }

  public redirectToDetails = (id: string) => {
      localStorage.setItem('accountDetailsID', id)
      this.router.navigateByUrl('accounts/deatils')
  }

  public canDelete(id: string, account: Account): boolean {
    let currentAccount;

    let storageAccount = localStorage.getItem("account");
    if (storageAccount != null) {
      currentAccount = Account.recoverAccount(storageAccount);
    }

    return (currentAccount?.userID != id && !account.role.includes("Admin")) ? true : false;
  }
}
