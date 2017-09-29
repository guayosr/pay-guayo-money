const paymentRequest = stripe.paymentRequest({
  country: 'US',
  currency: 'usd',
  total: {
    label: 'Pay Guayo',
    amount: 1000,
  },
  displayItems: [
    {
      amount: 500,
      label: 'Line 1',
    },
    {
      amount: 1000,
      label: 'Line 2',
    },
    {
      amount:0,
      label: 'Tax <script>alert(\'test\');</script>',
      pending: true
    },
  ],
  requestShipping: true,
  shippingOptions: [
    {
      label: 'Free Shipping',
      detail: 'It FREE!!',
      amount: 0,
      id: 'FreeShip',
    },
    {
      label: 'Expensive Shipping',
      detail: 'It not free',
      amount: 9999,
      id: 'ExpensiveShip',
    },
  ],
  requestPayerEmail:true,
  requestPayerPhone:true,
  requestPayerName:true,
});

paymentRequest.canMakePayment().then((result) => {
  console.log(result);
  if (result) {
    const theButton = elements.create(`paymentRequestButton`, {paymentRequest});
    theButton.mount('#the-button');
  } else {
    document.querySelector('#payment-request').style.display = 'none';
  }
});

paymentRequest.on('shippingaddresschange', (result) => {
    console.log(result);
    result.updateWith({
      status: 'success',
      total: {
        label: 'Pay Guayo',
        amount: 99999,
      },
    });
});

paymentRequest.on('shippingoptionchange', (result) => {
    console.log(result);
    result.updateWith({status: 'success'});
});

paymentRequest.on('token', (result) => {
  console.log(result);
  stripeSourceHandler(source);
});

paymentRequest.on('token', (result) => {
  console.log(result);
  stripeSourceHandler(source);
});
