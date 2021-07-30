import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";

import { ACCOUNT_API_URL, IDENTITY_API_URL } from './app-injection-tokens';
import { environment } from 'src/environments/environment';
import { JwtModule } from "@auth0/angular-jwt";
import { ACCESS_TOKEN_KEY } from "./services/auth.service";
import { AccountsComponent } from './components/accounts/accounts.component';
import { AccountComponent } from './components/account/account.component';

export function tokenGetter(){
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

@NgModule({
  declarations: [
    AppComponent,
    AccountsComponent,
    AccountComponent,
  ],
  exports: [
    AccountsComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatSortModule,
    MatPaginatorModule,

    JwtModule.forRoot({
      config: {
        tokenGetter
      }
    })
  ],
  providers: [{
    provide: IDENTITY_API_URL,
    useValue: environment.identityAPI
  },
  {
    provide: ACCOUNT_API_URL,
    useValue: environment.accountAPI
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
