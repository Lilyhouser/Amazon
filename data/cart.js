export const cart = [];

export function addToCart(productId) {
    const itemQuantity = Number(document.querySelector(`.js-product-quantity-${productId}`).value);
  
    let matchingItem;
  
    cart.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        matchingItem = cartItem;
      }
    });
  
    if (matchingItem) {
      matchingItem.quantity += itemQuantity;
    } else {
      cart.push({
        productId: productId,
        quantity: itemQuantity
      });
    }
  }