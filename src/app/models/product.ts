import { ProductType } from "./productType";

export class Product{
    public productType!: ProductType
    constructor(public productID: string,
                public productName: string,
                public description: string,
                public cost: number,
                public promotionalPointsCost: number,
                public productTypeID: string) {        
    }
}