import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const COMPANY_CONTEXT = `You are the specialized AI assistant for Advance Engineering Company, India's premier partner for instrumented rail technology.

CORE IDENTITY:
Advance Engineering Company is the only Indian firm credentialed by RDSO (Research Designs & Standards Organisation) to manufacturing and testing of Instrumented Measuring Wheelsets (IMWs). We are solving the critical "void in transport" by replacing imported European technology with indigenous "Make in India" solutions.

TECHNICAL DEEP DIVE (IMW & TELEMETRY):
1. Instrumented Measuring Wheelsets (IMW):
   - What they are: Standard railway wheelsets modified with precision sensors to measure dynamic wheel-rail interaction forces in real-time.
   - Function: They act as a "moving load cell," measuring parameters critical for safety and vehicle dynamics.
   - Key Measurements:
     * Lateral Forces (Y): Side-to-side forces that impact stability.
     * Vertical Forces (Q): Downward load.
     * Derailment Coefficient (Y/Q): The critical safety ratio used to predict derailment risks.
   - Technology: We use high-fidelity strain gauges bonded to the wheel web in specific Wheatstone bridge configurations to isolate these forces and cancel out thermal/centrifugal errors.

2. Telemetry System:
   - Challenge: Getting data off a wheel rotating at high speeds (e.g., Vande Bharat Express speeds) without using slip rings (which are noisy and wear out).
   - Solution: We utilize advanced digital telemetry.
   - How it works:
     * Analog signals from strain gauges are digitized on the rotating wheel itself.
     * Data is transmitted wirelessly (via RF/Induction) to a receiver mounted on the bogie frame or inside the coach.
     * This ensures noise-free, high-sampling-rate data acquisition even at 160+ km/h.

3. The Engineering Process:
   - Stage 1: Surface Preparation (Grinding and polishing wheel webs to mirror finish for sensor bonding).
   - Stage 2: Strain Gauge Marking & Bonding (Micron-level precision placement).
   - Stage 3: Wiring & Telemetry Installation (Securing electronics against 50g+ shock/vibration).
   - Stage 4: Static Calibration (Applying known loads in a test rig to generate calibration matrices).
   - Stage 5: Dynamic Validation (Field trials with RDSO).

COMPANY PROFILE:
- Founder: Mrs. Srabanti Ghosh (Visionary leadership).
- Technical Insight: Mr. Tirthankar Ghosh.
- Location: 6/41 Netaji Nagar, Kolkata - 700091.
- Contact: info@advanceng.in | 033 451 80382
- HR: hr@advanceng.in

VALUE PROPOSITION:
- "Make in India": We eliminate the reliance on foreign OEMs (Original Equipment Manufacturers), reducing costs and lead times.
- RDSO Partnership: We are the chosen domestic partner for Indian Railways' R&D wing.
- Expertise: Team includes alumni from IIT-Kharagpur and veterans from Alstom & Siemens.

INTERACTION GUIDELINES:
- When asked about technology, be detailed and technical. Use terms like "strain gauges," "telemetry," "Y/Q ratio," and "vehicle dynamics."
- Emphasize that this technology is crucial for the safety of high-speed trains like Vande Bharat.
- If asked about services, explain the end-to-end process from "lab to track."`;

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