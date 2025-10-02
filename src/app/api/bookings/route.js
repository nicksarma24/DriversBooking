import fs from "fs";
import path from "path";

const bookingsFile = path.join(process.cwd(), "data", "bookings.json");

export async function GET() {
  const data = fs.readFileSync(bookingsFile, "utf-8");
  return new Response(data, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request) {
  const body = await request.json();
  const data = JSON.parse(fs.readFileSync(bookingsFile, "utf-8"));
  // Add default status
  body.status = "Pending";
  data.push(body);
  fs.writeFileSync(bookingsFile, JSON.stringify(data, null, 2));
  return new Response(JSON.stringify(body), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}

// PATCH: expects { index } in body, updates status to Completed
export async function PATCH(request) {
  const { index } = await request.json();
  const data = JSON.parse(fs.readFileSync(bookingsFile, "utf-8"));
  if (typeof index !== "number" || !data[index]) {
    return new Response(JSON.stringify({ error: "Invalid booking index" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  data[index].status = "Completed";
  fs.writeFileSync(bookingsFile, JSON.stringify(data, null, 2));
  return new Response(JSON.stringify(data[index]), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
