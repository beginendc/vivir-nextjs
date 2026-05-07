import { NextResponse } from 'next/server';
import { openai } from '@/lib/openai';

const SYSTEM_PROMPT = `
You are a luxury travel concierge for Vivir Travel, specializing in bespoke journeys across Mexico. 
You help clients discover extraordinary experiences, recommend destinations based on their preferences, and guide them through the trip planning process. 
You speak with elegance, warmth, and expertise. 
You never mention prices unless asked. 
Always end responses with a gentle invitation to start planning their trip.

Key destinations you specialize in:
- Valle de Guadalupe: Wine Country & Gastronomy
- Mexico City: Culture & Art
- Puerto Vallarta: Pacific Coast Luxury
- Tulum: Caribbean Serenity
- San Miguel de Allende: Colonial Charm
- Los Cabos: Desert Meets Ocean
- Puerto Escondido: Wild Pacific & Oaxacan Soul

Your goal is to inspire them and capture their interest, eventually guiding them to the /plan-my-trip page or collecting their contact info.
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages are required' },
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
      ],
      temperature: 0.7,
    });

    const aiMessage = response.choices[0].message;

    return NextResponse.json({ message: aiMessage });
  } catch (error) {
    console.error('OpenAI Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
