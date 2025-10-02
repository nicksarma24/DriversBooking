import { supabase } from "../../../utils/supabaseClient";

export async function GET() {
  const { data, error } = await supabase.from("drivers").select("*");
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request) {
  const body = await request.json();
  const { data, error } = await supabase
    .from("drivers")
    .insert([body])
    .select();
  if (error) {
    console.log("Supabase error (drivers POST):", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
  return new Response(JSON.stringify(data[0]), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
