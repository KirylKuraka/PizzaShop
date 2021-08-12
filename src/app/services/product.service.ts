import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PRODUCT_API_URL } from '../app-injection-tokens';
import { Product } from '../models/product';
import { ACCESS_TOKEN_KEY } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseURL = `${this.apiURL}products/`;

  constructor(private http : HttpClient, @Inject(PRODUCT_API_URL) private apiURL: string) { }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.baseURL}`);
  }

  getProductsWithFilter(filterTerm: string): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.baseURL}?FilterTerm=${filterTerm}`);
  }

  getProductById(id: string): Observable<Product>{
    return this.http.get<Product>(`${this.baseURL}${id}`, {headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_KEY))})
  }

  updateProductById(id: string, product: Product): Observable<string>{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_KEY)
    });

    return this.http.put<string>(`${this.baseURL}${id}`, product, {headers: headers});
  }

  createProduct(product: Product): Observable<string>{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_KEY)
    });

    return this.http.post<string>(`${this.baseURL}`, product, {headers: headers});
  }

  deleteProductById(id: string): Observable<string>{
    return this.http.delete<string>(`${this.baseURL}${id}`, {headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_KEY))})
  }
}
