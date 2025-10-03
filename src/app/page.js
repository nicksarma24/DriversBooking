"use client";
import { useEffect, useState } from "react";

export default function Home() {

  const [bookings, setBookings] = useState([]);
  const [bookingForm, setBookingForm] = useState({
    customer: "",
    pickup: "",
    drop: "",
    driver: "",
  });
  const [bookingLoading, setBookingLoading] = useState(false);

  const handleBookingChange = (e) => {
    setBookingForm({ ...bookingForm, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingLoading(true);
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingForm),
    });
    if (res.ok) {
      const newBooking = await res.json();
      setBookings((prev) => [...prev, newBooking]);
      setBookingForm({ customer: "", pickup: "", drop: "", driver: "" });
    }
    setBookingLoading(false);
  };
  const [drivers, setDrivers] = useState([]);
  const [form, setForm] = useState({ name: "", car: "" });
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/drivers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const newDriver = await res.json();
      setDrivers((prev) => [...prev, newDriver]);
      setForm({ name: "", car: "" });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900">
      <div className="w-full max-w-xl mx-auto p-8 rounded-lg shadow-lg bg-neutral-800 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-8 text-white text-center">
          Driver Management
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full mb-8"
        >
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Driver Name"
            className="border border-neutral-700 bg-neutral-900 text-white p-3 rounded focus:outline-none focus:border-blue-500"
            required
          />
          <input
            name="car"
            value={form.car}
            onChange={handleChange}
            placeholder="Car Details"
            className="border border-neutral-700 bg-neutral-900 text-white p-3 rounded focus:outline-none focus:border-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50 font-semibold"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Driver"}
          </button>
        </form>
        <h2 className="text-xl font-semibold mb-4 text-white text-center">
          All Drivers
        </h2>
        <ul className="space-y-2 w-full">
          {drivers.length === 0 && (
            <li className="text-neutral-400 text-center">No drivers yet.</li>
          )}
          {drivers.map((d, i) => (
            <li
              key={i}
              className="border border-neutral-700 p-3 rounded bg-neutral-700 text-white shadow-sm text-center"
            >
              <span className="font-medium">{d.name}</span> —{" "}
              <span>{d.car}</span>
            </li>
          ))}
        </ul>
        <hr className="my-10 border-neutral-700 w-full" />
        <h1 className="text-3xl font-bold mb-8 text-white text-center">
          Booking Management
        </h1>
        <form
          onSubmit={handleBookingSubmit}
          className="flex flex-col gap-4 w-full mb-8"
        >
          <input
            name="customer"
            value={bookingForm.customer}
            onChange={handleBookingChange}
            placeholder="Customer Name"
            className="border border-neutral-700 bg-neutral-900 text-white p-3 rounded focus:outline-none focus:border-green-500"
            required
          />
          <input
            name="pickup"
            value={bookingForm.pickup}
            onChange={handleBookingChange}
            placeholder="Pickup Location"
            className="border border-neutral-700 bg-neutral-900 text-white p-3 rounded focus:outline-none focus:border-green-500"
            required
          />
          <input
            name="drop"
            value={bookingForm.drop}
            onChange={handleBookingChange}
            placeholder="Drop Location"
            className="border border-neutral-700 bg-neutral-900 text-white p-3 rounded focus:outline-none focus:border-green-500"
            required
          />
          <select
            name="driver"
            value={bookingForm.driver}
            onChange={handleBookingChange}
            className="border border-neutral-700 bg-neutral-900 text-white p-3 rounded focus:outline-none focus:border-green-500"
            required
          >
            <option value="" disabled>
              Select Driver
            </option>
            {drivers.map((d, i) => (
              <option key={i} value={d.name}>
                {d.name} ({d.car})
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50 font-semibold"
            disabled={bookingLoading}
          >
            {bookingLoading ? "Adding..." : "Add Booking"}
          </button>
        </form>
        <h2 className="text-xl font-semibold mb-4 text-white text-center">
          All Bookings
        </h2>
        <table className="min-w-full bg-neutral-700 border border-neutral-700 rounded shadow-sm text-white text-center">
          <thead>
            <tr className="bg-neutral-800">
              <th className="p-2 border border-neutral-700">Customer</th>
              <th className="p-2 border border-neutral-700">Pickup → Drop</th>
              <th className="p-2 border border-neutral-700">Driver</th>
              <th className="p-2 border border-neutral-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 && (
              <tr>
                <td colSpan={4} className="text-neutral-400 p-3">
                  No bookings yet.
                </td>
              </tr>
            )}
            {bookings.map((b, i) => (
              <tr key={i}>
                <td className="border border-neutral-700 p-2">{b.customer}</td>
                <td className="border border-neutral-700 p-2">
                  {b.pickup} → {b.drop}
                </td>
                <td className="border border-neutral-700 p-2">{b.driver}</td>
                <td className="border border-neutral-700 p-2">
                  {b.status === "Pending" ? (
                    <button
                      className="bg-yellow-500 text-neutral-900 px-2 py-1 rounded hover:bg-yellow-400 font-semibold"
                      onClick={async () => {
                        const res = await fetch("/api/bookings", {
                          method: "PATCH",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ id: b.id }),
                        });
                        if (res.ok) {
                          const updated = await res.json();
                          setBookings((prev) =>
                            prev.map((bk, idx) => (idx === i ? updated : bk))
                          );
                        }
                      }}
                    >
                      Mark Completed
                    </button>
                  ) : (
                    <span className="text-green-400 font-semibold">
                      Completed
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
