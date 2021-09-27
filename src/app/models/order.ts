import { Customer } from "./customer";
import { DeliveryMethod } from "./deliveryMethod";
import { OrderStatus } from "./orderStatus";
import { PaymentMethod } from "./paymentMethod";

export class Order {
    public customer!: Customer;
    public deliveryMethod!: DeliveryMethod;
    public paymentMethod!: PaymentMethod;
    public orderStatus!: OrderStatus;

    constructor(public orderID: string,
                public customerID: string,
                public orderDate: Date,
                public deliveryMethodID: string,
                public paymentMEthodID: string,
                public orderStatusID: string,
                public comment: string) {}
}