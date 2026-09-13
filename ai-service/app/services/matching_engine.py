"""
Deterministic mock university matching engine.
Weighting mirrors the frontend's /ai-matching explanation:
30% expertise, 20% past performance, 15% infrastructure,
15% faculty availability, 10% proximity, 10% workload.
"""
import math
from typing import List, Dict

UNIVERSITIES = [
    {"id": "u-bitm", "name": "BIT Mesra", "lat": 23.4132, "lng": 85.4485,
     "expertise": ["Water Management", "Environmental Engineering", "Civil Infrastructure"],
     "success_rate": 89, "labs": 3, "faculty": 3, "workload": 62},
    {"id": "u-ism", "name": "IIT (ISM) Dhanbad", "lat": 23.8144, "lng": 86.4425,
     "expertise": ["Groundwater Systems", "Mine Water Management", "Air Quality"],
     "success_rate": 86, "labs": 2, "faculty": 2, "workload": 71},
    {"id": "u-nitjsr", "name": "NIT Jamshedpur", "lat": 22.7925, "lng": 86.1842,
     "expertise": ["Industrial Emissions", "Urban Infrastructure", "Power Systems"],
     "success_rate": 83, "labs": 2, "faculty": 2, "workload": 54},
]

WEIGHTS = {"expertise": 0.30, "performance": 0.20, "infrastructure": 0.15,
           "faculty": 0.15, "proximity": 0.10, "workload": 0.10}


def _haversine(lat1, lng1, lat2, lng2):
    r = 6371
    d_lat = math.radians(lat2 - lat1)
    d_lng = math.radians(lng2 - lng1)
    a = math.sin(d_lat / 2) ** 2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(d_lng / 2) ** 2
    return r * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))


def rank_universities(required_expertise: List[str], lat: float, lng: float, limit: int = 3) -> List[Dict]:
    scored = []
    for u in UNIVERSITIES:
        expertise_score = min(100, 100 * len([e for e in required_expertise if any(e.lower() in ue.lower() or ue.lower() in e.lower() for ue in u["expertise"])]) / max(1, len(required_expertise)))
        infra_score = min(100, u["labs"] * 30 + 10)
        faculty_score = min(100, u["faculty"] * 28 + 16)
        distance = _haversine(lat, lng, u["lat"], u["lng"])
        proximity_score = max(10, 100 - distance * 1.1)
        workload_score = max(10, 100 - u["workload"])

        total = (
            expertise_score * WEIGHTS["expertise"]
            + u["success_rate"] * WEIGHTS["performance"]
            + infra_score * WEIGHTS["infrastructure"]
            + faculty_score * WEIGHTS["faculty"]
            + proximity_score * WEIGHTS["proximity"]
            + workload_score * WEIGHTS["workload"]
        )
        scored.append({"university_id": u["id"], "name": u["name"], "match_score": round(total)})

    return sorted(scored, key=lambda x: x["match_score"], reverse=True)[:limit]
