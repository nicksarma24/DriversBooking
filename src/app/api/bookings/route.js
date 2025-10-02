import { supabase } from "../../../utils/supabaseClient";

export async function GET() {
  const { data, error } = await supabase.from("bookings").select("*");
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
  body.status = "Pending";
  const { data, error } = await supabase
    .from("bookings")
    .insert([body])
    .select();
  if (error) {
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

// PATCH: expects { id } in body, updates status to Completed
export async function PATCH(request) {
  const { id } = await request.json();
  const { data, error } = await supabase
    .from("bookings")
    .update({ status: "Completed" })
    .eq("id", id)
    .select();
  if (error || !data || !data[0]) {
    console.log("Supabase error (bookings PATCH):", error);
    return new Response(
      JSON.stringify({ error: error?.message || "Invalid booking id" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  return new Response(JSON.stringify(data[0]), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
