export class Product{
    constructor(public productID: string,
                public productName: string,
                public description: string,
                public cost: number,
                public promotionalPointsCost: number,
                public productTypeID: string) {        
    }
}