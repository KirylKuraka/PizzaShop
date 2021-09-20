import { CartItem } from "./cartItem";

export class Cart {
    items: CartItem[] = [];

    /**
     * AddItem
     */
    public addItem(item: CartItem): void {
        this.items.push(item);
    }

    /**
     * RemoveItem
     */
    public removeItem(item: CartItem): void {
        this.items = this.items.filter((element) => {
            return element.product.productID != item.product.productID;
          })
    }

    /**
     * GetTotalSum
     */
    public getTotalSum(): number {
        let sum: number = 0;
        this.items.forEach(element => {
            sum += element.product.cost * element.quantity;
        });

        return sum;
    }

    /**
     * Clear
     */
    public clear() {
        this.items = []
    }

    /**
     * ConvertToJSON
     */
    public static convertToJSON(cart: Cart) : void {
        localStorage.setItem("cart", JSON.stringify(cart))
    }

    /**
     * ConvertToObject
     */
    public static convertToObject() : Cart {
        let cartJsonString = localStorage.getItem("cart")
        let cart: Cart = new Cart();
        if (cartJsonString != null && cartJsonString != "") {
            try{
                let tempObject = JSON.parse(cartJsonString) as Cart
                cart.items = tempObject.items
            }
            catch(e){
                alert(e)
            }
        }

        return cart;
    }
}