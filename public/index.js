  //API KEYS & INIT
const stripe = Stripe('pk_test_vUugg7dllbNRs7nUdqjlhqLE');
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
  switch(currentPaymentMethod) {
    case '#alipay':
      createAlipaySource(window.AMOUNT);
    case '#wechat':
      createWeChatPaySource(window.AMOUNT);
    default:
  }
});


