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
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatDividerModule } from "@angular/material/divider";

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
import { ProductsComponent } from './components/products/products.component';
import { AccountEditComponent } from './components/accounts/account-edit/account-edit.component';
import { ProductDetailsComponent } from './components/products/product-details/product-details.component';
import { ProductEditComponent } from './components/products/product-edit/product-edit.component';
import { AccountDeleteComponent } from './components/accounts/account-delete/account-delete.component';
import { ProductDeleteComponent } from './components/products/product-delete/product-delete.component';
import { ProductCreateComponent } from './components/products/product-create/product-create.component';
import { CartComponent } from './components/cart/cart.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderCreateComponent } from './components/orders/order-create/order-create.component';


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
    ProductsComponent,
    AccountEditComponent,
    ProductDetailsComponent,
    ProductEditComponent,
    AccountDeleteComponent,
    ProductDeleteComponent,
    ProductCreateComponent,
    CartComponent,
    OrdersComponent,
    OrderCreateComponent,
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
    MatDialogModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,

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
