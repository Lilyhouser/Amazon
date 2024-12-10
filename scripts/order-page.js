import { orders } from "../data/orders.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { getProduct, loadProductsFetch } from "../data/products.js";
import { cart, buyAgain } from "../data/cart.js";
import { formatCurrency } from "./utilis/money.js";

updateCartQuantity();

loadProductsFetch().then(() => {
    renderOrdersGrid();
});


function renderOrdersGrid(){
    let ordersHtml = '';

    orders.forEach((order) => {
        const orderDate = dayjs(order.orderTime).format('MMMM D');

        ordersHtml += 
        `
            <div class="order-container">
              
              <div class="order-header">
                <div class="order-header-left-section">
                  <div class="order-date">
                    <div class="order-header-label">Order Placed:</div>
                    <div>${orderDate}</div>
                  </div>
                  <div class="order-total">
                    <div class="order-header-label">Total:</div>
                    <div>$${formatCurrency(order.totalCostCents)}</div>
                  </div>
                </div>
    
                <div class="order-header-right-section">
                  <div class="order-header-label">Order ID:</div>
                  <div>${order.id}</div>
                </div>
              </div>
    
              <div class="order-details-grid">
                
                ${renderOrderDetailGrid(order)}

              </div>
            </div>
        `;
    
    });
    
    document.querySelector('.js-order-grid').innerHTML = ordersHtml;

    

    document.querySelectorAll('.js-buy-again-button').forEach((button) => {
        button.addEventListener('click', () => {
            buyAgain(button.dataset.productId);
            console.log(cart);
            updateCartQuantity();
        });
    })
}


function renderOrderDetailGrid(order){
    let orderHtml = '';
    order.products.forEach((product) => {
        const deliveryTime = dayjs(product.estimatedDeliveryTime).format('MMMM D');
        
        const matchingProduct = getProduct(product.productId);
        
        orderHtml += 
        `
            <div class="product-image-container">
              <img src="${matchingProduct.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${deliveryTime}
              </div>
              <div class="product-quantity">
                Quantity: ${product.quantity}
              </div>
              <button class="buy-again-button button-primary js-buy-again-button" data-product-id="${product.productId}">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${order.id}&productId=${product.productId}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
        `;
    });

    return orderHtml;
}

function updateCartQuantity() {
    let cartQuantity = 0;
  
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
  
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}