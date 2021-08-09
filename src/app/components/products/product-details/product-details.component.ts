import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product!: Product
  constructor(private dialogRef: MatDialogRef<ProductDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) private data: {product: Product}) { }

  ngOnInit(): void {
    this.product = this.data.product
  }

}
