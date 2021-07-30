import { HttpClient } from '@angular/common/http';
import { Token } from '../models/token';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { IDENTITY_API_URL } from '../app-injection-tokens';

export const ACCESS_TOKEN_KEY = 'account_access_token'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    @Inject(IDENTITY_API_URL) private apiURL: string,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) { }

  login(username: string, password: string): Observable<Token>{
    return this.http.post<Token>(`${this.apiURL}authentication/login`, {
      username, password
    }).pipe(
      tap(token => {
        console.log(token.token)
        localStorage.setItem(ACCESS_TOKEN_KEY, token.token)
      })
    )
  }
  
  isAuthenticated(): boolean{
    var token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if(token != null){
      return !this.jwtHelper.isTokenExpired(token);
    }
    else{
      return false;
    }
  }

  logout(): void{
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    this.router.navigate(['']);
  }
  
}


