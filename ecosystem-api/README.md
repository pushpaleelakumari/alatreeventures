 Full-stack project that touches on API integration, logging, basic authentication, and admin UI.
# Ecosystem API Layer (Universal Onboarding Engine)

A single, universal API endpoint to enroll users and sync them across multiple platforms — including MailerLite, Weather API, or mock CRMs — while logging transactions and offering a lightweight admin dashboard.

---

## Features

-  **Universal `/api/enroll` endpoint**
-  **API key-based platform validation**
-  Modular Express.js structure
-  Transaction logging in JSON
-  MailerLite integration
-  Weather API support (OpenWeatherMap)
-  HTML-based Admin Dashboard (view stats, add platforms) - Not included
-  cURL/Postman-friendly endpoints

---

## Tech Stack

- Node.js 18+
- Express
- JSON file storage
- MailerLite API
- OpenWeatherMap API
- Bootstrap (for dashboard styling)


## Setup Instructions

### 1. Clone & Install

```bash
git clone https://github.com/pushpaleelakumari/ecosystem-api.git
cd ecosystem-api
npm install
### 2. Configure .env
MAILERLITE_API_KEY=your-mailerlite-api-key
WEATHER_API_KEY=your-openweather-api-key
PORT=5000
### 3. Configure platforms

Edit config/platforms.json to define valid platform → API key mappings

### 4. Run the Server
node server.js
-

### 5. Postman curls
1. adding new platform OR Source
curl --location 'http://localhost:3000/admin/platforms' \
--header 'Content-Type: application/json'  \
--data '{
    "platform": "<Enter your platform name>"
  }'

2. Enroll/logging user
curl --location 'http://localhost:5000/api/enroll' \
--header 'Content-Type: application/json' \
--header 'x-api-key: <Enter your source API key>' \
--data-raw '{
    "email": "<Enter your Email>",
    "source": "<Enter your Source Name>",
    "targets": ["MailerLite"]
  }'

3. To get the User Data
curl --location 'http://localhost:5000/admin/data'