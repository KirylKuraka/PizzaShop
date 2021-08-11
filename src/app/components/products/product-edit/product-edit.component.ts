import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/product';
import { ProductType } from 'src/app/models/productType';
import { ProductTypeService } from 'src/app/services/product-type.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  product!: Product

  typesSelect = new FormControl();
  typesList: string[] = [];
  selectedType = ''

  productTypes: ProductType[] = [];

  public editProductForm!: FormGroup;

  constructor(private dialogRef: MatDialogRef<ProductEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {product: Product},
              private productTypeService: ProductTypeService) { }

  ngOnInit(): void {
    this.product = this.data.product
    this.selectedType = this.product.productType.productTypeName;
    this.typesSelect.setValue(this.selectedType)

    this.editProductForm = new FormGroup({
      productName: new FormControl(this.product.productName, [Validators.required]),
      description: new FormControl(this.product.description, [Validators.required]),
      cost: new FormControl(this.product.cost, [Validators.required, Validators.min(0)]),
      pPoints: new FormControl(this.product.promotionalPointsCost, [Validators.required, Validators.min(0)]),
    })

    this.productTypeService.getProductTypes()
      .subscribe(res => {
        this.productTypes = res as ProductType[];
        this.productTypes.forEach(element => {
          this.typesList.push(element.productTypeName)
        });
      })
  }

  public validateControl = (controlName: string) => {
    return this.editProductForm.controls[controlName].invalid && this.editProductForm.controls[controlName].touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.editProductForm.controls[controlName].hasError(errorName)
  }

  public saveChanges = () => {
    let formValues = {...this.editProductForm.value}

    this.product.productName = formValues.productName;
    this.product.description = formValues.description;
    this.product.cost = formValues.cost;
    this.product.promotionalPointsCost = formValues.pPoints;

    if(this.selectedType != null){
      this.productTypes.forEach(element => {
        if (element.productTypeName == this.selectedType){
          this.product.productType = element
          this.product.productTypeID = element.productTypeID
        }
      })
    }

    this.data.product = this.product;

    this.dialogRef.close(this.data)
  }

}
