export function getDeliveryOption(deliveryOptionId) {
    let deliveryOpt;

    deliveryOption.forEach((opt) => {
      if(opt.id===deliveryOptionId) {
        deliveryOpt = opt;
      }
    });

    return deliveryOpt || deliveryOption[0];
}

export const deliveryOption = [
    {
        id: '1',
        deliveryDays: 7,
        priceCents: 0
    },
    {
        id: '2',
        deliveryDays: 3,
        priceCents: 499
    }, 
    {
        id: '3',
        deliveryDays: 1,
        priceCents: 999
    }
];