import { NextResponse } from 'next/server';
import { products } from '@/data/products';

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      sport = 'Cricket',
      skill_level = 'Intermediate',
      playing_surface = 'Natural Grass Turf',
      focus_area = 'All-Round Readiness',
    } = body;

    // Try connecting to Python LangGraph service first
    try {
      const pyRes = await fetch('http://127.0.0.1:8000/api/strategist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sport,
          skill_level,
          playing_surface,
          focus_area,
        }),
        cache: 'no-store',
      });

      if (pyRes.ok) {
        const pyData = await pyRes.json();
        return NextResponse.json(pyData);
      }
    } catch (e) {
      // Python service offline or connecting
    }

    // Try Express backend bridge
    try {
      const expRes = await fetch('http://127.0.0.1:5001/api/ai/strategist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sport,
          skill_level,
          playing_surface,
          focus_area,
        }),
        cache: 'no-store',
      });

      if (expRes.ok) {
        const expData = await expRes.json();
        return NextResponse.json(expData);
      }
    } catch (e) {
      // Express offline
    }

    // Internal robust fallback matching logic
    const matched = products.filter(
      (p) => p.sport.toLowerCase() === sport.toLowerCase()
    );
    const finalGear = matched.length > 0 ? matched : products.slice(0, 4);

    return NextResponse.json({
      success: true,
      sport,
      skill_level,
      playing_surface,
      coach_verdict: `Playstate Performance Audit: For ${skill_level} ${sport}, this gear package provides reliable durability and tactile response on ${playing_surface}.`,
      strategy: {
        pitch_prep: `Calibrate traction and verify ball condition on ${playing_surface}.`,
        warmup_routine: '5-minute dynamic joint opening, 4-minute agility ladder, 3-minute match-tempo acceleration reps.',
        focus_verdict: `Priority objective: Maximize ${focus_area}.`,
        environmental_tip: 'Outdoor air density and humidity directly affect bounce and trajectory.',
      },
      drills: [
        {
          title: `${sport} Mechanics & Stance Alignment`,
          duration: '20 mins',
          description: `Focus on weight balance, grip pressure, and repetitive execution using regulation gear.`,
        },
        {
          title: 'Agility & Directional Shuttle Sprints',
          duration: '15 mins',
          description: 'High-speed footwork reps around boundary cones with instantaneous direction change.',
        },
        {
          title: 'Pressure Game Simulation',
          duration: '15 mins',
          description: 'Match-tempo target reps testing accuracy under cardiovascular fatigue.',
        },
      ],
      matched_gear: finalGear,
      starter_preset: finalGear.map((m) => ({
        id: m.id,
        name: m.name,
        price: m.price,
        category: m.category,
        sport: m.sport,
        selected_option: m.options ? m.options[0] : 'Standard',
        quantity: 1,
      })),
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process AI strategy request' },
      { status: 500 }
    );
  }
}
