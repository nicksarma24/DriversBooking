import fs from "fs";
import path from "path";

const driversFile = path.join(process.cwd(), "data", "drivers.json");

export async function GET() {
  const data = fs.readFileSync(driversFile, "utf-8");
  return new Response(data, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request) {
  const body = await request.json();
  const data = JSON.parse(fs.readFileSync(driversFile, "utf-8"));
  data.push(body);
  fs.writeFileSync(driversFile, JSON.stringify(data, null, 2));
  return new Response(JSON.stringify(body), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
