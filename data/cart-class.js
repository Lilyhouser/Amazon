class Cart {
    cartItems;
    localStorageKey;

    constructor(localStorageKey) {
        this.localStorageKey = localStorageKey;
        this.loadFromStorage();
    }

    loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)) || [{
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryOptionId: '1'
        }, {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
            deliveryOptionId: '2'
        }];
    }

    saveToStorage() {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
    }

    addToCart(productId) {
        let matchingItem;

        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId === productId) {
                matchingItem = cartItem;
            }
        });

        const itemQuantity = Number(document.querySelector(`.js-product-quantity-${productId}`).value);
        console.log(itemQuantity);

        if (matchingItem) {
            matchingItem.quantity += itemQuantity;
        } else {
            this.cartItems.push({
                productId: productId,
                quantity: itemQuantity,
                deliveryOptionId: '1'
            });
        }
        this.saveToStorage();
    }

    removeFromCart(productId) {
        const newCart = [];

        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId !== productId) {
                newCart.push(cartItem);
            }
        });

        this.cartItems = newCart;
        this.saveToStorage();
    }

    updateDeliveryOption(productId, deliveryOptionId) {
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId === productId) {
                cartItem.deliveryOptionId = deliveryOptionId;
            }
        });

        this.saveToStorage();
    }

    calTotalInCart() {
        let sum = 0;
        this.cartItems.forEach((cartItem) => sum += cartItem.quantity);
        return sum;
    }

}

const cart = new Cart('cart-oop');
const bussinessCart = new Cart('cart-business');

console.log(cart);
console.log(bussinessCart);
