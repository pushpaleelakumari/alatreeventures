// utils/crmSync.js
const axios = require('axios');
require('dotenv').config();

// Main entry point: determines which sync action to take
exports.syncToCRM = async (target, data) => {
  try {
    switch (target) {
      case 'MailerLite':
        await syncToMailerLite(data.email);
        break;
      case 'weather_app':
        await fetchWeather(data.city || 'Hyderabad');
        break;
      default:
        console.log(`🔁 Unknown CRM target: "${target}". No action taken.`);
    }
  } catch (err) {
    console.error(`Sync to ${target} failed:`, err.message);
  }
};

// MailerLite Integration
async function syncToMailerLite(email) {
  if (!process.env.MAILERLITE_API_KEY) {
    throw new Error('MAILERLITE_API_KEY not found in .env');
  }

  const url = 'https://api.mailerlite.com/api/v2/subscribers';

  const payload = { email };

  const headers = {
    'Content-Type': 'application/json',
    'X-MailerLite-ApiKey': process.env.MAILERLITE_API_KEY
  };

  const response = await axios.post(url, payload, { headers });

  console.log(`MailerLite: Subscribed ${email}`);
}

// Weather API Integration
async function fetchWeather(city) {
  const apiKey = process.env.WEATHER_API_KEY;
  if (!apiKey) {
    throw new Error('WEATHER_API_KEY not found in .env');
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  const response = await axios.get(url);
  const weather = response.data;

  console.log(`Weather in ${city}: ${weather.weather[0].description}, ${weather.main.temp}°C`);
}