import { cart, removeFromCart, calTotalInCart, updateDeliveryOption } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utilis/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOption, getDeliveryOption } from "../../data/deliveryOption.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderOrderSummary() {
    let cartSummaryHTML = '';

    document.querySelector('.js-return-to-home-link').innerHTML = `${calTotalInCart()} items`;

    cart.forEach((cartItem) => {
        const productId = cartItem.productId;

        const matchingProduct = getProduct(productId);

        const deliveryOptionId = cartItem.deliveryOptionId;

        let deliveryOpt = getDeliveryOption(deliveryOptionId);

        const today = dayjs();
        const deliveryDate = today.add(deliveryOpt.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');

        cartSummaryHTML +=
            `
          <div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}">
              <div class="delivery-date">
                Delivery date: ${dateString}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingProduct.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingProduct.name}
                  </div>
                  <div class="product-price">
                    ${matchingProduct.getPrice()}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                      Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>

                  ${deliveryOptionsHTML(matchingProduct.id, cartItem)}
                </div>
              </div>
            </div>
      `;
    });

    function deliveryOptionsHTML(matchingProductId, cartItem) {
        let html = '';
        deliveryOption.forEach((deliveryOpt) => {
            const today = dayjs();
            const deliveryDate = today.add(deliveryOpt.deliveryDays, 'days');
            const dateString = deliveryDate.format('dddd, MMMM D');
            const priceString = deliveryOpt.priceCents === 0 ? 'FREE Shipping' : `$${formatCurrency(deliveryOpt.priceCents)} - shipping`;

            const isChecked = deliveryOpt.id === cartItem.deliveryOptionId;

            html += `
        <div class="delivery-option js-delivery-option" data-product-id=${matchingProductId} data-delivery-option-id=${deliveryOpt.id}>
          <input type="radio" class="delivery-option-input"
            ${isChecked ? 'checked' : ''}
            name="delivery-option-${matchingProductId}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString}
            </div>
          </div>
        </div>
      `;
        });
        return html;
    }

    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

    document.querySelectorAll('.js-delete-link').forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            removeFromCart(productId);

            const removeProduct = document.querySelector(`.js-cart-item-container-${productId}`).remove();
            document.querySelector('.js-return-to-home-link').innerHTML = `${calTotalInCart()} items`;

            renderPaymentSummary();
        });
    });

    document.querySelectorAll('.js-delivery-option').forEach((element) => {
        element.addEventListener('click', () => {
            const { productId, deliveryOptionId } = element.dataset;
            updateDeliveryOption(productId, deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
        });
    });
}
