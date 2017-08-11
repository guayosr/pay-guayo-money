//==iDEAL==
const createP24Source = (amount) => {
  stripe.createSource({
    type: 'p24',
    amount: (parseInt(amount)*100),
    currency: 'eur',
    //TO-DO: pass through email
    owner: {
      email: 'guayosr@gmail.com',
    },
    redirect: {
      return_url: 'https://pay.guayo.money',
    },
  }).then(function(result) {
    $("#p24 a").attr("href", result.source.redirect.url);
  });
} ;