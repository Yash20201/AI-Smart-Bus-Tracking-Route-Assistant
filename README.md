# 🚌 AI Smart Bus Tracking & Route Assistant

A full-stack real-time bus tracking system with role-based access for Admins, Drivers, and Passengers, built with Node.js, Express, MongoDB, and Socket.IO.

## Features

- **Authentication** — JWT-based login/register with bcrypt password hashing and role selection (Admin / Driver / Passenger)
- **Admin Panel** — sidebar dashboard to manage buses, drivers, routes, and trips, with live stats and delete confirmation on every entity
- **Driver Panel** — a driver enters their bus number and shares live GPS location with one click
- **Passenger Map** — live map (Leaflet + OpenStreetMap) showing every active bus in real time via Socket.IO
- **Live Tracking** — click "Track" on any live bus to see a real road-following route (via OSRM) and live distance/ETA from that bus to your own location, updating as the bus moves
- **AI Route Assistant** — type a starting point and destination, get the best matching route automatically
- **AI ETA Prediction** — estimated arrival time to a route's next stop based on live GPS position
- **Demo Mode** — a simulated moving bus on the passenger page so the tracking feature can be seen immediately, with no second device or driver session needed

## Tech Stack

**Backend:** Node.js, Express 5, MongoDB (Mongoose), Socket.IO, JWT, bcryptjs
**Frontend:** Vanilla JavaScript, HTML/CSS, Leaflet.js (served locally, no CDN dependency)
**Routing:** OSRM public routing API for real road-following paths, with automatic fallback to a straight-line estimate if unreachable

## Project Structure

```
bus-tracking-system/
├── config/          # Database + socket configuration
├── controllers/      # Route handler logic (auth, admin, bus, route, trip, driver, passenger, ai)
├── middleware/        # Auth, role, and error-handling middleware
├── models/            # Mongoose schemas (User, Bus, Route, Trip, BusLocation, Notification)
├── routes/            # Express route definitions
├── services/          # ETA calculation, AI route suggestion, notifications
├── sockets/            # Socket.IO real-time location broadcast handler
├── public/            # Frontend: login/register, driver panel, passenger map, admin panel
└── server.js          # App entry point
```

## Setup & Running

### 1. Prerequisites
- Node.js (v18+ recommended)
- MongoDB running locally, or a free MongoDB Atlas cluster (https://www.mongodb.com/atlas)

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment
A working `.env` is already included for local MongoDB:
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/bustracker
JWT_SECRET=your_secret_key
```
If using Atlas instead, replace `MONGO_URI` with your Atlas connection string.

### 4. Run the server
```bash
npm run dev
```
You should see:
```
Server is running on port 5000
MongoDB connected successfully
```

### 5. Open in browser
| Page | URL |
|---|---|
| Register | http://localhost:5000/register.html |
| Login | http://localhost:5000/login.html |
| Driver Panel | http://localhost:5000/driver/driver.html |
| Passenger Map | http://localhost:5000/passenger/passenger.html |
| Admin Dashboard | http://localhost:5000/admin/dashboard.html |

There are no pre-seeded accounts — register at least one user per role to test the full system (see demo flow below).

## Demo Flow (for presentation/grading)

**Quickest option — no setup needed:**
1. Register and log in as a **passenger**
2. Click **"▶ Try Demo"** in the sidebar — a simulated bus starts moving immediately
3. Click **"🎯 Track"** on it to see the live road-following route and distance to your location

**Full real flow (two browser tabs):**
1. Register an **admin** account → log in → go to Buses, add a bus (e.g. number `101`) → go to Routes, add a route → back in Buses, assign the driver and route to the bus
2. Register a **driver** account → log in → enter the same bus number (`101`) → click "Start Tracking" and allow location access
3. Open a second tab, register/log in as a **passenger** → the bus appears live on the map, with the AI Route Assistant and ETA features available in the sidebar

## Notes

- Leaflet and Socket.IO's client library are served directly from this server (not an external CDN), so the map and live tracking work even on restricted networks.
- The AI ETA feature (time to next route stop) requires stop coordinates, which aren't currently collected by the "Add Route" form — it will show "not enough data" until stops have lat/lng set directly in the database.
- The live "Track" feature's road-routing uses a free public OSRM server; if that service is unreachable, it automatically falls back to a straight-line distance estimate rather than failing.
