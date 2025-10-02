
# Booking System

This is a Next.js app for managing drivers and bookings, using local JSON files for data storage. No external database required.

## Tech Stack
- **Frontend:** Next.js (JavaScript), Tailwind CSS
- **Backend:** Next.js API routes
- **Database:** Local JSON files (`/data/drivers.json`, `/data/bookings.json`)

## Features
- **Driver Management**
	- Add drivers (name + car details)
	- View all drivers
- **Booking Management**
	- Add bookings (customer name, pickup, drop, assigned driver)
	- View all bookings in a table
	- Booking status: Pending or Completed
- **Update Booking Status**
	- Mark bookings as Completed

## How to Run Locally
1. Install dependencies:
	 ```bash
	 npm install
	 ```
2. Start the development server:
	 ```bash
	 npm run dev
	 ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Data Storage
- All data is stored in local JSON files in the `/data` folder.
- No external database or cloud service required.

## Deployment
- You can deploy this app to Vercel, Netlify, or Render.

## File Structure
- `src/app/page.js`: Main UI for driver and booking management
- `src/app/api/drivers/route.js`: API for driver CRUD
- `src/app/api/bookings/route.js`: API for booking CRUD and status update
- `data/`: Local JSON files for persistent storage

---
Feel free to fork, modify, and deploy!
