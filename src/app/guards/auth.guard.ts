import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
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
      localStorage.setItem("isAdmin", "false")
      this.router.navigate(['']);
    }
  
    const isRefrechSuccess = await this.tryRefreshingTokens();
    if (!isRefrechSuccess) {
      localStorage.setItem("isAdmin", "false")
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
