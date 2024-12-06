import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from '../../data/cart.js';

describe('test suite: renderOrderSummary', () => {
    const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

    beforeEach(() => {
        spyOn(localStorage, 'setItem');

        document.querySelector('.js-test-container').innerHTML = `
            <div class="js-return-to-home-link"></div>
            <div class="js-order-summary"></div>
            <div class="js-payment-summary"></div>
        `;

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: productId1,
                quantity: 2,
                deliveryOptionId: '1'
            }, {
                productId: productId2,
                quantity: 1,
                deliveryOptionId: '2'
            }]);
        });
        loadFromStorage();

        renderOrderSummary();
    });

    afterEach(() => {
        document.querySelector('.js-test-container').innerHTML = '';
    });

    it('displace the cart', () => {
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
    });


    it('delete a product', () => {
        document.querySelector(`.js-delete-link-${productId1}`).click();

        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);

        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId2);
    });
});