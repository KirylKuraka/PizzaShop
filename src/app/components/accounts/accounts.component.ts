import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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

  constructor(private accountService: AccountService) { }

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

  public redirectToUpdate = (id: string) =>{

  }

  public redirectToDelete = (id: string) => {
    alert(id)
  }

  public redirectToDetails = (id: string) => {

  }
}
