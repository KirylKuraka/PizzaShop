import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private data = new Map<string, any>();

  setSharedValue(key: string, value: any) {
    this.data.set(key, value);
  }

  getSharedData() {
    return this.data
  }
}
