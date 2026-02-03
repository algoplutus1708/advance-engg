import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const COMPANY_CONTEXT = `You are the virtual assistant for Advance Engineering Company, an Indian engineering firm based in Kolkata.

COMPANY PROFILE:
Advance Engineering Company is a visionary Indian engineering firm founded in 2020 by Mrs. Srabanti Ghosh. The company is dedicated to challenging the status quo and crafting a new legacy for India's transport sector by driving the "Make in India" initiative.
- Founder: Mrs. Srabanti Ghosh (Visionary entrepreneur emphasizing forward-thinking strategies).
- Technical Lead: Mr. Tirthankar Ghosh (Provides technical insight for precision engineering).

CORE EXPERTISE & SERVICES:
We specialize in Instrumented Measuring Wheelsets (IMWs) and are the premier partner for Indian Railways and RDSO.
- The Problem We Solve: We address the critical void in specialized testing apparatus in India, eliminating the dependency on European firms, logistical delays, and complex customs procedures.
- The Solution: Custom-engineered testing equipment manufactured domestically in India.
- Process Stages: 
  1. Surface Preparation (Cleaning and prep of wheelset surface).
  2. Marking Process (Precision layout for strain gauges).
  3. Surface Inspection (Quality check).
  4. Sensor Placement (Aligning gauges for optimal data).
  5. Lab Operations (Ongoing testing and calibration).

KEY ACHIEVEMENTS & PARTNERSHIPS:
- We are the ONLY Indian company credentialed by RDSO (Research, Designs & Standards Organisation) to collaborate on IMW testing.
- We work under the guidance of the Prime Minister's Make in India initiative.
- We have secured direct assurance from Indian Railway authorities.

THE TEAM:
Our reputation is earned through a world-class team comprising:
- Alumni from IIT-Kharagpur (India's premier technical institution).
- Experts from Indian Railways (Decades of operational experience).
- Veterans from Alstom & Siemens (Global transport technology expertise).

CAREERS & VALUES:
We look for individuals driven by a higher purpose to serve the country while achieving personal goals.
- Values: Higher Purpose, Innovation, Excellence, and Collaboration.
- Hiring: Interested candidates can send CVs to hr@advanceng.in.

CONTACT DETAILS:
- Address: 6/41 Netaji Nagar, Near Netaji Nagar Women's College, Kolkata - 700091, West Bengal, India.
- Phone: 033 451 80382
- General Email: info@advanceng.in
- HR Email: hr@advanceng.in
- Business Hours: Monday - Saturday, 9:00 AM - 6:00 PM IST.

GUIDELINES:
- Keep responses helpful, professional, and concise.
- Emphasize our role in the "Make in India" initiative and our exclusive RDSO partnership when relevant.
- If asked about specific technical details not listed here, kindly suggest contacting our technical team via email.`;

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