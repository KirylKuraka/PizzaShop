import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ORDER_API_URL } from '../app-injection-tokens';
import { Order } from '../models/order';
import { ACCESS_TOKEN_KEY } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseURL = `${this.apiURL}orders/`;

  constructor(private http : HttpClient, @Inject(ORDER_API_URL) private apiURL: string) { }

  getOrders(filterTerm: string, search: string, sort: string, pageNumber: number, pageSize: number): Observable<HttpResponse<Order[]>>{
    return this.http.get<Order[]>(`${this.baseURL}?FilterTerm=${filterTerm}&searchTerm=${search}&orderBy=${sort}&PageNumber=${pageNumber}&PageSize=${pageSize}`, {observe: 'response'});
  }

  getOrderById(id: string): Observable<Order>{
    return this.http.get<Order>(`${this.baseURL}${id}`, {headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_KEY))})
  }

  updateOrderById(id: string, order: Order): Observable<string>{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_KEY)
    });

    return this.http.put<string>(`${this.baseURL}${id}`, order, {headers: headers});
  }

  createOrder(order: Order): Observable<string>{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_KEY)
    });

    return this.http.post<string>(`${this.baseURL}`, order, {headers: headers});
  }

  deleteOrderById(id: string): Observable<string>{
    return this.http.delete<string>(`${this.baseURL}${id}`, {headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_KEY))})
  }
}
