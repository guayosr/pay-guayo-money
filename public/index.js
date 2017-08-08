//API KEYS & INIT
const stripe = Stripe('pk_test_vUugg7dllbNRs7nUdqjlhqLE');
const elements = stripe.elements();

//Track payment method and amount
var currentPaymentMethod = "#card";
var amount = <%= @amount %>;


//===HANDLE AMOUNT CHANGES==
const updateAmount = (new_amount) => {
  amount = new_amount;
  $("#amount").val(amount);

  //Change things that depend on amount
  $(".pay-btn").attr("value", "Pay $" + amount + ".00");
  $(".pay-btn").text("Pay $" + amount + ".00");
  switch(currentPaymentMethod) {
    case '#alipay':
      createAlipaySource(amount);
    case '#wechat':
      createWeChatPaySource(amount);
    default:
  };
};
updateAmount(amount);


$("#amount").on('keyup change', function() {
  updateAmount(this.value);
});


//===HANDLE PAYMENT SELECTION CHANGES==
//Create sources when tabs are clicked
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  currentPaymentMethod = e.target.hash;
  switch(currentPaymentMethod) {
    case '#alipay':
      createAlipaySource(amount);
    case '#wechat':
      createWeChatPaySource(amount);
    default:
  }
});


//==WECHAT==
//TO-DO: actually create source
var weChatQrCode = undefined;
const createWeChatPaySource = (amount) => {
  if (weChatQrCode === undefined) {
    stripe.createSource({
      type: 'wechat',
      amount: (parseInt(amount)*100),
      currency: 'usd',
    }).then(function(result) {
      weChatQrCode = new QRCode(document.getElementById("wechat-qrcode"), "http://google.com" + amount);
    });
  } else {
    weChatQrCode.clear();
    stripe.createSource({
      type: 'wechat',
      amount: (parseInt(amount)*100),
      currency: 'usd'
    }).then(function(result) {
      weChatQrCode.makeCode("http://google.com" + amount);
    });
    w
  };
};


//==ALIPAY==
const createAlipaySource = (amount) => {
  stripe.createSource({
    type: 'alipay',
    amount: (parseInt(amount)*100),
    currency: 'usd',
    redirect: {
      return_url: 'https://pay.guayo.money',
    },
  }).then(function(result) {
    $("#alipay a").attr("href", result.source.redirect.url);
  });
} ;


//==CARDS==
const cardElement = elements.create('card', {
style: {
  base: {
    iconColor: '#666EE8',
    color: '#31325F',
    lineHeight: '40px',
    fontWeight: 300,
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSize: '15px',

    '::placeholder': {
      color: '#CFD7E0',
    },
  },
}
});
cardElement.mount('#card-element');

cardElement.addEventListener('change', ({error}) => {
  const displayError = document.getElementById('payment-errors');
  if (error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
});

const stripeSourceHandler = (source) => {
  const form = document.getElementById('payment-form');
  const hiddenSource = document.createElement('input');
  hiddenSource.setAttribute('type', 'hidden');
  hiddenSource.setAttribute('name', 'source');
  hiddenSource.setAttribute('value', source.id);
  form.appendChild(hiddenSource);

  const hiddenAmount = document.createElement('input');
  hiddenAmount.setAttribute('type', 'hidden');
  hiddenAmount.setAttribute('name', 'amount');
  hiddenAmount.setAttribute('value', parseInt(amount)*100);
  form.appendChild(hiddenAmount);

  // Submit the form
  form.submit();
}

const form = document.getElementById('payment-form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const {source, error} = await stripe.createSource(cardElement);

  if (error) {
    // Inform the user if there was an error
    const errorElement = document.getElementById('payment-errors');
    errorElement.textContent = error.message;
  } else {
    // Send the token to your server
    stripeSourceHandler(source);
  }
});