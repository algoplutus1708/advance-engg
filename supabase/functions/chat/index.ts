import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const COMPANY_CONTEXT = `You are the virtual assistant for Advance Engineering Company, an Indian engineering firm based in Kolkata.

ABOUT THE COMPANY:
- Founded by Mrs. Srabanti Ghosh in 2020
- Mr. Tirthankar Ghosh provides technical insight
- Located at: 6/41 Netaji Nagar, Near Netaji Nagar Women's College, Kolkata - 700091
- Contact: info@advanceng.in | 033 451 80382
- HR Email: hr@advanceng.in

WHAT WE DO:
- Specialize in Instrumented Measuring Wheelsets (IMWs) for Indian Railways
- Premier partner for Indian Railways and RDSO (Research, Designs & Standards Organisation)
- Drive the Make in India initiative
- Provide custom-engineered testing equipment manufactured domestically
- Eliminate import bottlenecks and dependency on European firms

TEAM CREDENTIALS:
- Alumni from IIT-Kharagpur
- Experts from Indian Railways
- Veterans from Alstom & Siemens

KEY ACHIEVEMENTS:
- Only Indian company credentialed by RDSO to collaborate on IMW testing
- Direct assurance from Indian Railway authorities
- Strategic partnership filling the critical void in Indian transport sector

MISSION:
"Passionate about Precision Technology" - We are dedicated to challenging the status quo and crafting a new legacy for India's transport sector.

When users ask to contact the company, provide the contact information above. Keep responses helpful, professional, and concise.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Processing chat request with", messages.length, "messages");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: COMPANY_CONTEXT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: "Failed to process your request" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat function error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
