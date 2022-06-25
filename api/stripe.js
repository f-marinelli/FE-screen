const stripe = require('stripe')(
  'sk_test_51LEFDvI4iDsRIwWmy0YuPdobPjqRFkoA1LGBueQ3FXu7fLuxUEmBFidJqIzIQVTF1K8GUDzToSZPSxlKa3q1mK1Q00DfVn3HRp'
);
const express = require('express');
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:3000';

app.post('/api/stripe', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: 'price_1LEFEmI4iDsRIwWmqmxcNt0D',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.redirect(303, session.url);
});

module.exports = app;
