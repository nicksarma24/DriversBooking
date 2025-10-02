
# Booking System

This is a Next.js app for managing drivers and bookings, now using Supabase as the database backend for production and deployment.

## Tech Stack
- **Frontend:** Next.js (JavaScript), Tailwind CSS
- **Backend:** Next.js API routes
- **Database:** Supabase (PostgreSQL)

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
- All data is stored in Supabase tables (`drivers`, `bookings`).
- Local JSON files are no longer used for production/deployment.

## Deployment
- You can deploy this app to Vercel, Netlify, or Render.
- Make sure to set your Supabase credentials in `.env.local`:
	```env
	NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
	NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
	```

## Supabase Table Setup

Create these tables in your Supabase project:

**drivers**
- `id` (integer, primary key, auto-increment)
- `name` (text)
- `car` (text)

**bookings**
- `id` (integer, primary key, auto-increment)
- `customer` (text)
- `pickup` (text)
- `drop` (text)
- `driver` (text)
- `status` (text)

Enable Row Level Security (RLS) and add policies to allow inserts and updates for development.

## File Structure
- `src/app/page.js`: Main UI for driver and booking management
- `src/app/api/drivers/route.js`: API for driver CRUD
- `src/app/api/bookings/route.js`: API for booking CRUD and status update
- `data/`: Local JSON files for persistent storage

---
Feel free to fork, modify, and deploy!
