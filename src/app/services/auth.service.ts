import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '../models/token';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { IDENTITY_API_URL } from '../app-injection-tokens';
import { UserForRegistrationDTO } from '../models/userForRegistrationDTO';
import { RegistrationResponseDTO } from '../models/registrationResponseDTO';
import { Role } from '../models/role';

export const ACCESS_TOKEN_KEY = 'account_access_token'
export const REFRESH_TOKEN_KEY = 'account_refresh_token'

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
        console.log(token.refreshToken);
        
        localStorage.setItem(ACCESS_TOKEN_KEY, token.token)
        localStorage.setItem(REFRESH_TOKEN_KEY, token.refreshToken)

        let jwtData = token.token.split('.')[1];
        let decodedJwtJsonData = window.atob(jwtData);
        let decodedJwtData = JSON.parse(decodedJwtJsonData);

        if(typeof(decodedJwtData.role) == "string"){
          localStorage.setItem("currentUserRole", decodedJwtData.role)
        }
        else{
          localStorage.setItem("currentUserRole", decodedJwtData.role.sort().join(" - "))
        }

        localStorage.setItem("isAdmin", decodedJwtData.isAdmin)
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
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.setItem("isAdmin", "false")
    localStorage.setItem("currentUserRole", "")
    this.router.navigate(['']);
  }
  
  registration(user: UserForRegistrationDTO) {
    return this.http.post<RegistrationResponseDTO> (`${this.apiURL}authentication`, user);
  }

  getUserRoleById(id: string): Observable<Role>{
    return this.http.get<Role>(`${this.apiURL}authentication/${id}`, {headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_KEY))})
  }

  checkUsername(id: string, userName: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiURL}authentication/checkUsername?id=${id}&userName=${userName}`, 
                                  {headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_KEY))})
  }
}


