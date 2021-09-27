import { InjectionToken } from "@angular/core";

export const IDENTITY_API_URL = new InjectionToken<string>('https://localhost:44342/');
export const ACCOUNT_API_URL = new InjectionToken<string>('https://localhost:44343/');
export const PRODUCT_API_URL = new InjectionToken<string>('https://localhost:44344/');
export const ORDER_API_URL = new InjectionToken<string>('https://localhost:44345/');