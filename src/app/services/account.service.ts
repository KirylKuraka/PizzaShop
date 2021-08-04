import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ACCOUNT_API_URL } from '../app-injection-tokens';
import { Account } from '../models/account';
import { ACCESS_TOKEN_KEY } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseURL = `${this.apiURL}account/`;

  constructor(private http : HttpClient, @Inject(ACCOUNT_API_URL) private apiURL: string) { }

  getAccount(): Observable<Account>{
    return this.http.get<Account>(`${this.baseURL}`, {headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_KEY))});
  }

  getAccounts(): Observable<Account[]>{
    return this.http.get<Account[]>(`${this.baseURL}all`, {headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_KEY))});
  }

  getAccountById(id: string): Observable<Account>{
    return this.http.get<Account>(`${this.baseURL}${id}`, {headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_KEY))})
  }

  updateAccountById(id: string, account: Account): Observable<string>{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_KEY)
    });

    return this.http.put<string>(`${this.baseURL}${id}`, account, {headers: headers});
  }

  deleteAccountById(id: string): Observable<string>{
    return this.http.delete<string>(`${this.baseURL}${id}`, {headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_KEY))})
  }
}