import { loadProductsFetch, getProduct } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { getOrder } from "../data/orders.js";
import { cart } from '../data/cart.js';

updateCartQuantity();

loadProductsFetch().then(() => {
    renderTrackingPage();
});

function renderTrackingPage(){
    const url = new URL(window.location.href);

    const productId = url.searchParams.get('productId');
    const product = getProduct(productId);

    const orderId = url.searchParams.get('orderId');
    const orderedProducts = getOrder(orderId).products;

    let orderedProduct;

    orderedProducts.forEach((product) => {
        if(product.productId===productId){
            orderedProduct = product;
        }
    });

    const arrivingDate = dayjs(orderedProduct.estimatedDeliveryTime).format('dddd, MMMM D');

    document.querySelector('.order-tracking').innerHTML = 
    `
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${arrivingDate}
        </div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">
          Quantity: ${orderedProduct.quantity}
        </div>

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
    `;
}

function updateCartQuantity() {
    let cartQuantity = 0;
  
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
  
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}