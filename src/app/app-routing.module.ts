import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { AccountsComponent } from "./components/accounts/accounts.component";
import { AccountComponent } from './components/account/account.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { OrdersComponent } from './components/orders/orders.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'accounts', component: AccountsComponent, canActivate: [AuthGuard]},
  {path: 'presonalAccount', component: AccountComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'products', component: ProductsComponent, canActivate: [AuthGuard]},
  {path: 'cart', component: CartComponent},
  {path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
