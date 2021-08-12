import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.scss']
})
export class ProductDeleteComponent implements OnInit {
  product!: Product
  constructor(private dialogRef: MatDialogRef<ProductDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {product: Product}) { }

  ngOnInit(): void {
    this.product = this.data.product
  }

  onDeleteClick(): void {
    this.dialogRef.close(true)
  }

  onNoClick(): void {
    this.dialogRef.close(false)
  }
}
