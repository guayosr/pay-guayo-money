  //API KEYS & INIT
const stripe = Stripe('pk_test_vUugg7dllbNRs7nUdqjlhqLE');
const elements = stripe.elements();

//Track payment method and amount
let currentPaymentMethod = "#card";
let amount = window.AMOUNT;


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


