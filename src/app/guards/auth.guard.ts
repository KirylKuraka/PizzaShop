import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { IDENTITY_API_URL } from '../app-injection-tokens';
import { ACCESS_TOKEN_KEY, AuthService, REFRESH_TOKEN_KEY } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private as: AuthService, private router: Router, private http: HttpClient,
    @Inject(IDENTITY_API_URL) private apiURL: string,){}

  async canActivate(): Promise<boolean> {
    if (!this.as.isAuthenticated()) {
      this.router.navigate(['']);
    }
  
    const isRefrechSuccess = await this.tryRefreshingTokens();
    if (!isRefrechSuccess) {
      this.router.navigate(['login']);
    }

    return isRefrechSuccess;
  }
  
  private async tryRefreshingTokens(): Promise<boolean> {
    let token = localStorage.getItem(ACCESS_TOKEN_KEY)
    let refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (!token || !refreshToken) { 
      return false;
    }

    let isRefreshSuccess: boolean;
    try {
      const response = await this.as.refreshToken(token, refreshToken);

      console.log(response)
      const newToken = (<any>response).body.token;
      const newRefreshToken = (<any>response).body.refreshToken;

      localStorage.setItem(ACCESS_TOKEN_KEY, newToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, newRefreshToken);
      
      isRefreshSuccess = true;
    }
    catch (ex) {      
      isRefreshSuccess = false;
    }
    return isRefreshSuccess;
  }
}
