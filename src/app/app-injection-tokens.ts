import { InjectionToken } from "@angular/core";

export const IDENTITY_API_URL = new InjectionToken<string>('https://localhost:44342/');
export const ACCOUNT_API_URL = new InjectionToken<string>('https://localhost:44343/');