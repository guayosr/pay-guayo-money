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
  hiddenAmount.setAttribute('value', parseInt(window.AMOUNT)*100);
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
