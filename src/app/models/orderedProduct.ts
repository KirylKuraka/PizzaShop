import { Order } from "./order";
import { ProductType } from "./productType";

export class OrderedProduct {
    public productType!: ProductType;
    public order!: Order;

    constructor(public orderedProductID: string,
                public productTypeID: string,
                public productName: string,
                public quantity: number,
                public orderID: string,
                public totalCost: number){}
}