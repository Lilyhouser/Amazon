import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import '../data/cart-class.js';
// import '../data/backend-practice.js';
loadPage();

async function loadPage() {
    try {
        // throw 'error1';

        await Promise.all([
            loadProductsFetch(),

            new Promise((resolve, reject) => {
                // throw 'error2';
                loadCart(() => {
                    // reject('error3');
                    resolve();
                });
            })
        ]);

    } catch (error) {
        console.log('unexpected error. please try again latter');
    }

    renderOrderSummary();
    renderPaymentSummary();
}

// async function loadPage() {
//     await loadProductsFetch();

//     await new Promise((resolve) => {
//         loadCart(() => {
//             resolve();
//         });
//     });

//     renderOrderSummary();
//     renderPaymentSummary();
// }

/*
Promise.all([
    loadProductsFetch(),
    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    })

]).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*
new Promise((resolve) => {
    loadProducts(() => {
        resolve('value1');
    });

}).then((value) => {
    console.log(value);
    return new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    });

}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/

// loadProducts(() => {
//     loadCart(() => {
//         renderOrderSummary();
//         renderPaymentSummary();
//     });
// });
