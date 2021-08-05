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
import { MatSelectModule } from '@angular/material/select';

import { ACCOUNT_API_URL, IDENTITY_API_URL, PRODUCT_API_URL } from './app-injection-tokens';
import { environment } from 'src/environments/environment';
import { JwtModule } from "@auth0/angular-jwt";
import { ACCESS_TOKEN_KEY } from "./services/auth.service";
import { AccountsComponent } from './components/accounts/accounts.component';
import { AccountComponent } from './components/account/account.component';
import { SharedService } from './services/shared.service';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ReactiveFormsModule } from "@angular/forms";
import { AccountDetailsComponent } from './components/accounts/account-details/account-details.component';
import { HomeComponent } from './components/home/home.component';

export function tokenGetter(){
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccountsComponent,
    AccountComponent,
    LoginComponent,
    RegistrationComponent,
    AccountDetailsComponent,
  ],
  exports: [
    AccountsComponent,
    AccountComponent,
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
    MatSelectModule,

    ReactiveFormsModule,

    JwtModule.forRoot({
      config: {
        tokenGetter
      }
    })
  ],
  providers: [
    SharedService,
  {
    provide: IDENTITY_API_URL,
    useValue: environment.identityAPI
  },
  {
    provide: ACCOUNT_API_URL,
    useValue: environment.accountAPI
  },
  {
    provide: PRODUCT_API_URL,
    useValue: environment.productAPI
  }],
  bootstrap: [AppComponent],
})
export class AppModule { }
