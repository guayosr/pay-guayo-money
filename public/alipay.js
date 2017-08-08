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