/*
  Optionele backend voor Stripe Checkout.
  Vereist: `npm install express stripe`
  Starten: `STRIPE_SECRET_KEY=sk_test_... node api/server.js`
*/
const express = require('express');
const Stripe = require('stripe');
const path = require('path');
const fetch = require('node-fetch'); // Import node-fetch

// Vervang dit met je ECHTE secret key in een .env bestand
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });

const app = express();
const staticDir = path.resolve(__dirname, '..');

app.use(express.json());
app.use(express.static(staticDir)); // Serveert index.html en assets

// Nieuw endpoint voor gebedstijden
app.get('/api/prayer-times', async (req, res) => {
  try {
    const city = 'Utrecht';
    const country = 'Netherlands';
    const method = 5; // Egyptian General Authority of Survey (common for Europe)
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are 0-indexed

    const aladhanApiUrl = `http://api.aladhan.com/v1/calendarByCity?city=${city}&country=${country}&method=${method}&month=${month}&year=${year}`;
    
    const response = await fetch(aladhanApiUrl);
    if (!response.ok) {
      throw new Error(`AlAdhan API error: ${response.statusText}`);
    }
    const data = await response.json();

    if (data.code !== 200 || !data.data) {
      throw new Error(`AlAdhan API returned an error: ${data.status}`);
    }

    // Find today's prayer times
    const today = date.getDate();
    const todayPrayerTimes = data.data.find(day => day.date.gregorian.day == today);

    if (!todayPrayerTimes) {
      throw new Error('Could not find prayer times for today.');
    }

    const timings = todayPrayerTimes.timings;

    // Extract and format the required prayer times
    const prayerTimes = {
      fajr: timings.Fajr.split(' ')[0],
      dhuhr: timings.Dhuhr.split(' ')[0],
      asr: timings.Asr.split(' ')[0],
      maghrib: timings.Maghrib.split(' ')[0],
      isha: timings.Isha.split(' ')[0],
    };

    res.json(prayerTimes);

  } catch (error) {
    console.error('Error fetching prayer times:', error.message);
    res.status(500).json({ error: 'Failed to fetch prayer times', details: error.message });
  }
});

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { amountEuro } = req.body;
    const amount = Number(amountEuro);

    if (isNaN(amount) || amount < 2) {
      return res.status(400).json({ error: 'Ongeldig bedrag. Minimum is €2.' });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card', 'ideal'],
      success_url: 'https://shinqiet.nl/#doneren?success=true',
      cancel_url: 'https://shinqiet.nl/#doneren?canceled=true',
      currency: 'eur',
      line_items: [{
        price_data: {
          currency: 'eur',
          unit_amount: Math.round(amount * 100), // Stripe verwacht centen
          product_data: {
            name: 'Donatie Stichting Shinqiet',
            description: 'Uw bijdrage helpt ons educatieve en maatschappelijke projecten te realiseren.'
          }
        },
        quantity: 1
      }],
      allow_promotion_codes: true,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe API Error:', err.message);
    res.status(500).json({ error: 'Interne serverfout', details: err.message });
  }
});

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => console.log(`Server draait op http://localhost:${PORT}`));