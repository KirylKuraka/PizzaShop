import { TestBed } from '@angular/core/testing';

import { OrderedProductService } from './ordered-product.service';

describe('OrderedProductService', () => {
  let service: OrderedProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderedProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
