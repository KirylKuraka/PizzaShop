import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PRODUCT_API_URL } from '../app-injection-tokens';
import { ProductType } from '../models/productType';
import { ACCESS_TOKEN_KEY } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {
  private baseURL = `${this.apiURL}productTypes/`;

  constructor(private http : HttpClient, @Inject(PRODUCT_API_URL) private apiURL: string) { }

  getProductTypes(): Observable<ProductType[]>{
    return this.http.get<ProductType[]>(`${this.baseURL}`);
  }

  getProductTypeById(id: string): Observable<ProductType>{
    return this.http.get<ProductType>(`${this.baseURL}${id}`, {headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_KEY))})
  }

  updateProductTypeById(id: string, productType: ProductType): Observable<string>{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_KEY)
    });

    return this.http.put<string>(`${this.baseURL}${id}`, productType, {headers: headers});
  }

  createProductType(id: string, productType: ProductType): Observable<string>{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_KEY)
    });

    return this.http.post<string>(`${this.baseURL}`, productType, {headers: headers});
  }

  deleteProductTypeById(id: string): Observable<string>{
    return this.http.delete<string>(`${this.baseURL}${id}`, {headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_KEY))})
  }
}
