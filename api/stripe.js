const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const stripe = require('stripe')(
  'sk_test_51LEFDvI4iDsRIwWmy0YuPdobPjqRFkoA1LGBueQ3FXu7fLuxUEmBFidJqIzIQVTF1K8GUDzToSZPSxlKa3q1mK1Q00DfVn3HRp'
);
const express = require('express');
const app = express();
const serviceAccount = require('./diagrammi-666da-c4da3fb7df69.json');

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

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
    success_url: `http://localhost:3000/api/stripe`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    metadata: {
      user: Object.keys(req.body)[0],
    },
  });

  res.redirect(303, session.url);
});

app.get('/api/stripe', async (req, res) => {
  const session = await stripe.checkout.sessions.list({
    limit: 1,
  });

  if (session.data[0].status === 'complete') {
    const userRef = db
      .collection('users')
      .doc(Object.values(session.data[0].metadata)[0]);

    await userRef.update({
      APIKey:
        Math.random().toString(36).slice(2) +
        Math.random().toString(36).slice(2),
    });
  }

  res.redirect(YOUR_DOMAIN);
});

module.exports = app;
