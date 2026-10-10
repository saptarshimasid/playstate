"""Playstate AI Sports Gear & Match Strategist
Powered by Python, LangChain, and LangGraph
"""

import json
import os
from typing import Dict, List, Any, Optional
from typing_extensions import TypedDict
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
from langgraph.graph import StateGraph, END

# Load Playstate catalog
CATALOG_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "src", "products.json")
try:
    with open(CATALOG_PATH, "r", encoding="utf-8") as f:
        PRODUCTS = json.load(f)
except Exception as e:
    PRODUCTS = []

# Define LangGraph State
class SportKitState(TypedDict):
    sport: str
    skill_level: str
    playing_surface: str
    focus_area: str
    matched_gear: List[Dict[str, Any]]
    drills: List[Dict[str, str]]
    strategy: Dict[str, Any]
    starter_preset: List[Dict[str, Any]]
    coach_verdict: str

# Node 1: Analyze and Match Equipment from Playstate Catalog
def match_gear_node(state: SportKitState) -> Dict[str, Any]:
    sport = state.get("sport", "Cricket").strip().lower()
    skill_level = state.get("skill_level", "Intermediate").strip().lower()

    # Filter catalog for relevant gear
    matched = []
    for item in PRODUCTS:
        item_sport = item.get("sport", "").lower()
        if item_sport == sport or (sport in ["all-rounder", "multi-sport"] and item.get("tag")):
            matched.append(item)
    
    # If no exact sport matched or general, provide essentials
    if not matched:
        matched = PRODUCTS[:4]

    return {"matched_gear": matched}

# Node 2: Generate Sport Strategy & Training Drills
def strategy_drills_node(state: SportKitState) -> Dict[str, Any]:
    sport = state.get("sport", "Cricket")
    surface = state.get("playing_surface", "Natural Grass / Turf")
    level = state.get("skill_level", "Intermediate")
    focus = state.get("focus_area", "Agility & Core Technique")

    sport_drills = {
        "Cricket": [
            {"title": "Target Stump Bowling & Batting Stance Drill", "duration": "20 mins", "description": "Set up Backyard Wicket Set at 22 yards. Focus on front-foot balance using Boundary Willow bat and Red Seam ball."},
            {"title": "Reaction & Reflex Fielding Box", "duration": "15 mins", "description": "High-intensity short-distance rebound fielding drills with gloves for quick wrist adjustments and safe grip mechanics."},
            {"title": "Pacing & Running Between Wickets", "duration": "15 mins", "description": "Place training cones at crease marks. Perform 20 sprint turnarounds with full batting pads to build conditioned stride recovery."}
        ],
        "Football": [
            {"title": "Slalom Dribble & Controlled First Touch", "duration": "15 mins", "description": "Weave through six low-profile training cones using inside and outside instep. Finish with a clipped pass."},
            {"title": "Passing Quadrant Precision Reps", "duration": "20 mins", "description": "Two-touch ground distribution against a rebound wall or partner with Sunday League Football."},
            {"title": "Box Conditioning & Change of Pace", "duration": "15 mins", "description": "Shuttle sprints marked by cones with ball shielding under defensive body pressure."}
        ],
        "Basketball": [
            {"title": "Perimeter Stance & Rhythm Pull-ups", "duration": "20 mins", "description": "5-spot perimeter footwork into jump shots with Courtside outdoor pebbled ball."},
            {"title": "Zigzag Defensive Slide Reps", "duration": "15 mins", "description": "Court-length low-center-of-gravity slides to build hip stamina and directional switch speed."},
            {"title": "Pressure Free-Throw Routine", "duration": "10 mins", "description": "Cardio heart-rate spike followed immediately by 10 focused free-throws."}
        ],
        "Hockey": [
            {"title": "Touchline Stickhandling Slalom", "duration": "20 mins", "description": "Quick wrist rotations navigating around training cones with Clean Strike Hockey Ball."},
            {"title": "Low Slap Hit & Sweep Passing", "duration": "15 mins", "description": "Technique focus on body stay-down angle and clean head contact with the turf."},
            {"title": "Receiving in Stride", "duration": "15 mins", "description": "Cushioning moving balls on synthetic turf without giving up yardage."}
        ],
        "Tennis": [
            {"title": "Crosscourt Deep Ball Consistency", "duration": "25 mins", "description": "Maintain 20-shot neutral rallies targeting depth behind service line with Baseline Racket."},
            {"title": "Split-Step & Approach Footwork", "duration": "15 mins", "description": "Timing the split-step to the contact moment and taking short balls on the rise."},
            {"title": "First Serve Placement Grid", "duration": "15 mins", "description": "Targeting wide slice and T flat serves with designated cone zones."}
        ],
        "Volleyball": [
            {"title": "Platform Setting & Passing Posture", "duration": "20 mins", "description": "Overhead finger contact drills and locked platform digs with Open Air Volleyball."},
            {"title": "Transition Spike Footwork Approach", "duration": "20 mins", "description": "3-step kinetic jump approach practicing timing at the net."},
            {"title": "Jump Float Serve Repeatability", "duration": "15 mins", "description": "Consistent contact point on the center valve to produce erratic air knuckle."}
        ],
        "Golf": [
            {"title": "Fairway Iron Impact Alignment", "duration": "25 mins", "description": "Clean ball-turf strike drills with Fairway Iron focusing on hip rotation."},
            {"title": "Tempo & Backswing Checkpoint", "duration": "15 mins", "description": "Count 3:1 swing tempo using dimpled golf balls and chalk line."},
            {"title": "Scramble Distance Control", "duration": "15 mins", "description": "Targeting 50 to 120-yard greens with consistent grip pressure."}
        ],
        "Badminton": [
            {"title": "Scissor Kick Overhead Clear", "duration": "20 mins", "description": "Rear-court overhead clearance with snappy forearm pronation using Park Rally Racket."},
            {"title": "Net Kill & Soft Tumbling Tumble", "duration": "15 mins", "description": "Finger-tightened soft net drops and explosive net tap finishes."},
            {"title": "Corner Footwork Shadow Ghosting", "duration": "15 mins", "description": "Shadow movements to 6 corners for rapid court recovery."}
        ]
    }

    drills = sport_drills.get(sport, sport_drills["Cricket"])
    
    strategy = {
        "pitch_prep": f"Tailored for {surface}. Calibrate gear grip and friction before high-tempo movement.",
        "warmup_routine": "5-minute dynamic joint openers, 3 minutes progressive lunges, 2 minutes game-pace acceleration reps.",
        "focus_verdict": f"Priority objective: Master {focus} at the {level} competitive tier.",
        "environmental_tip": "Check outdoor ambient humidity and temperature to optimize ball pressure and equipment longevity."
    }

    return {"drills": drills, "strategy": strategy}

# Node 3: Synthesize Coach Verdict & Build Kit Preset
def compile_kit_pack_node(state: SportKitState) -> Dict[str, Any]:
    matched = state.get("matched_gear", [])
    sport = state.get("sport", "Cricket")
    level = state.get("skill_level", "Intermediate")
    
    total_guide_price = sum(item.get("price", 0) for item in matched)
    
    verdict = (
        f"Playstate Performance Audit: For {level} {sport}, this curated gear setup balances durability "
        f"and precise feedback on {state.get('playing_surface', 'outdoor conditions')}. Total estimated kit: ₹{total_guide_price:,}."
    )

    preset_items = []
    for item in matched:
        preset_items.append({
            "id": item.get("id"),
            "name": item.get("name"),
            "price": item.get("price"),
            "category": item.get("category"),
            "selected_option": item.get("options", ["Standard"])[0] if item.get("options") else "Standard",
            "quantity": 1
        })

    return {
        "coach_verdict": verdict,
        "starter_preset": preset_items
    }

# Build LangGraph Workflow
workflow = StateGraph(SportKitState)
workflow.add_node("match_gear", match_gear_node)
workflow.add_node("strategy_drills", strategy_drills_node)
workflow.add_node("compile_kit_pack", compile_kit_pack_node)

workflow.set_entry_point("match_gear")
workflow.add_edge("match_gear", "strategy_drills")
workflow.add_edge("strategy_drills", "compile_kit_pack")
workflow.add_edge("compile_kit_pack", END)

ai_graph = workflow.compile()

# FastAPI Application
app = FastAPI(title="Playstate AI Gear & Match Strategist", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class StrategistRequest(BaseModel):
    sport: str = "Cricket"
    skill_level: str = "Intermediate"
    playing_surface: str = "Outdoor Turf"
    focus_area: str = "Match Readiness & Technique"

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "Playstate LangGraph & LangChain AI Engine",
        "catalog_size": len(PRODUCTS)
    }

@app.get("/health")
def health_check():
    return {"status": "ok", "engine": "LangGraph StateGraph compiled"}

@app.get("/api/catalog")
def get_catalog():
    return PRODUCTS

@app.post("/api/strategist")
def get_strategy(payload: StrategistRequest):
    try:
        initial_state: SportKitState = {
            "sport": payload.sport,
            "skill_level": payload.skill_level,
            "playing_surface": payload.playing_surface,
            "focus_area": payload.focus_area,
            "matched_gear": [],
            "drills": [],
            "strategy": {},
            "starter_preset": [],
            "coach_verdict": ""
        }
        
        # Execute LangGraph workflow
        result = ai_graph.invoke(initial_state)
        return {
            "success": True,
            "sport": payload.sport,
            "skill_level": payload.skill_level,
            "playing_surface": payload.playing_surface,
            "coach_verdict": result.get("coach_verdict"),
            "strategy": result.get("strategy"),
            "drills": result.get("drills"),
            "matched_gear": result.get("matched_gear"),
            "starter_preset": result.get("starter_preset")
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
