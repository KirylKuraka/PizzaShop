import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  product!: Product

  rolesSelect = new FormControl();
  rolesList: string[] = ['Admin', 'Customer'];
  selectedRole = ''

  constructor(private dialogRef: MatDialogRef<ProductEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {product: Product}) { }

  ngOnInit(): void {
    this.product = this.data.product
    this.selectedRole = this.product.productType.productTypeName;
    this.rolesSelect.setValue(this.selectedRole)
  }

  public saveChanges = () => {
    // if(this.selectedRole != null){
    //   let typeID
    //   this.product.productType.
    // }

    this.data.product = this.product;

    this.dialogRef.close(this.data)
  }

}
