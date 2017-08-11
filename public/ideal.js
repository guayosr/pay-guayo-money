//==iDEAL==
const createIdealSource = (amount) => {
  stripe.createSource({
    type: 'ideal',
    amount: (parseInt(amount)*100),
    currency: 'eur',
    redirect: {
      return_url: 'https://pay.guayo.money',
    },
  }).then(function(result) {
    $("#ideal a").attr("href", result.source.redirect.url);
  });
} ;