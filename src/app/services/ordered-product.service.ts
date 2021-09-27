import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ORDER_API_URL } from '../app-injection-tokens';
import { OrderedProduct } from '../models/orderedProduct';
import { ACCESS_TOKEN_KEY } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderedProductService {
  private baseURL = `${this.apiURL}orders/`;

  constructor(private http : HttpClient, @Inject(ORDER_API_URL) private apiURL: string) { }

  getOrderedProducts(filterTerm: string, search: string, sort: string, pageNumber: number, pageSize: number): Observable<HttpResponse<OrderedProduct[]>>{
    return this.http.get<OrderedProduct[]>(`${this.baseURL}?FilterTerm=${filterTerm}&searchTerm=${search}&orderBy=${sort}&PageNumber=${pageNumber}&PageSize=${pageSize}`, {observe: 'response'});
  }

  getOrderedProductById(id: string): Observable<OrderedProduct>{
    return this.http.get<OrderedProduct>(`${this.baseURL}${id}`, {headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_KEY))})
  }

  updateOrderedProductById(id: string, orderedProduct: OrderedProduct): Observable<string>{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_KEY)
    });

    return this.http.put<string>(`${this.baseURL}${id}`, orderedProduct, {headers: headers});
  }

  createOrderedProduct(orderedProduct: OrderedProduct): Observable<string>{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_KEY)
    });

    return this.http.post<string>(`${this.baseURL}`, orderedProduct, {headers: headers});
  }

  deleteOrderedProductById(id: string): Observable<string>{
    return this.http.delete<string>(`${this.baseURL}${id}`, {headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_KEY))})
  }
}
