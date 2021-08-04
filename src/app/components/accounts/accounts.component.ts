import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  rolesSelect = new FormControl();
  rolesList: string[] = ['Admin', 'Customer'];
  selectedRole = ['']

  account!: Account;
  public showFlag: boolean = false;
  
  public dataSource = new MatTableDataSource<Account>();
  columns = ['firstName', 'lastName', 'userName', 'email', 'phone', 'pPoints', 'role', 'details', 'update', 'delete']

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

  public redirectToUpdate = (_account: Account) =>{
    this.account = _account;
    this.selectedRole = this.account.role.split(" - ");
    this.rolesSelect.setValue(this.selectedRole)

    this.showFlag = true;
  }

  public saveChanges = () => {
    if (confirm("Сохранить внесенные изменения?")) {
      if (this.selectedRole.length != 0) {
        this.account.role = this.selectedRole.join(" - ");
      }
      else {
        this.account.role = "Customer";
      }

      let index = this.dataSource.data.findIndex((item) => {
        return item.userID == this.account.userID
      })

      this.dataSource.data[index] = this.account;
      this.accountService.updateAccountById(this.account.userID, this.account)
        .subscribe(res => {
          console.log(res)
        })
      
        this.showFlag = false;
    }
    else{
      this.showFlag = false;
    }
  }

  public redirectToDelete = (id: string) => {
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
      localStorage.setItem('id', id)
      this.router.navigateByUrl('accounts/details')
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
