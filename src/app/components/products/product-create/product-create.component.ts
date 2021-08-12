import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/models/product';
import { ProductType } from 'src/app/models/productType';
import { ProductTypeService } from 'src/app/services/product-type.service';
import { Guid } from "src/app/models/guid";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {
  product!: Product

  typesSelect = new FormControl();
  typesList: string[] = [];
  selectedType = ''

  productTypes: ProductType[] = [];

  public editProductForm!: FormGroup;

  constructor(private dialogRef: MatDialogRef<ProductCreateComponent>,
              private productTypeService: ProductTypeService) { }

  ngOnInit(): void {
    this.typesSelect.setValue(this.selectedType)

    this.editProductForm = new FormGroup({
      productName: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      cost: new FormControl('', [Validators.required, Validators.min(0)]),
      pPoints: new FormControl('', [Validators.required, Validators.min(0)]),
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

    let productType: ProductType = new ProductType();
    if(this.selectedType != null){
      this.productTypes.forEach(element => {
        if (element.productTypeName == this.selectedType){
          productType = element
        }
      })
    }

    this.product = new Product(Guid.newGuid(), 
                               formValues.productName,
                               formValues.description,
                               formValues.cost,
                               formValues.pPoints,
                               productType.productTypeID 
                               )
    this.product.productType = productType;
    this.dialogRef.close(this.product)
  }

}
