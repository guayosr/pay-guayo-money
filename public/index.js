  //API KEYS & INIT
const stripe = Stripe(window.PUB_KEY);
const elements = stripe.elements();

//Track payment method and amount
let currentPaymentMethod = "#card";

//===HANDLE AMOUNT CHANGES==
const updateAmount = (new_amount) => {
  window.AMOUNT = new_amount;
  $("#amount").val(window.AMOUNT);

  //Change things that depend on amount
  $(".pay-btn").attr("value", "Pay $" + window.AMOUNT + ".00");
  $(".pay-btn").text("Pay $" + window.AMOUNT + ".00");
  switch(currentPaymentMethod) {
    case '#alipay':
      createAlipaySource(window.AMOUNT);
    case '#ideal':
      createIdealSource(window.AMOUNT);
    case '#p24':
      createP24Source(window.AMOUNT); 
    case '#wechat':
      createWeChatPaySource(window.AMOUNT);
    default:
  };
};
updateAmount(window.AMOUNT);


$("#amount").on('keyup change', function() {
  updateAmount(this.value);
});


//===HANDLE PAYMENT SELECTION CHANGES==
//Create sources when tabs are clicked
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  currentPaymentMethod = e.target.hash;
  console.log(currentPaymentMethod);
  switch(currentPaymentMethod) {
    case '#alipay':
      createAlipaySource(window.AMOUNT);
    case '#ideal':
      createIdealSource(window.AMOUNT);
    case '#p24':
      createP24Source(window.AMOUNT);
    case '#wechat':
      createWeChatPaySource(window.AMOUNT);
    default:
  }
});


//==Handle source
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
  hiddenAmount.setAttribute('value', parseInt(window.AMOUNT)*100);
  form.appendChild(hiddenAmount);

  // Submit the form
  form.submit();
}


