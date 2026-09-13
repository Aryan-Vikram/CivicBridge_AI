"""
Deterministic mock NLP engine.

This module is intentionally dependency-free (no real model calls) so the
service runs anywhere without API keys. Swap the body of `classify` and
`analyze` for real calls to an LLM/embeddings provider (OpenAI, Gemini, or a
local model) — every route in app/routes already calls through this module,
so no other code needs to change.
"""
from typing import List

CATEGORY_KEYWORDS = {
    "Water Management": ["water", "well", "contaminat", "borewell", "drink", "pond", "groundwater"],
    "Health": ["health", "medicine", "clinic", "phc", "illness", "disease", "hospital"],
    "Education": ["school", "student", "classroom", "teacher"],
    "Infrastructure": ["road", "bridge", "electricity", "transformer", "transport", "building", "crack"],
    "Agriculture": ["crop", "farm", "irrigation", "soil", "harvest"],
    "Environment": ["air quality", "pollution", "emission", "environment", "industrial discharge"],
    "Waste Management": ["waste", "garbage", "dump", "sewage", "overflow"],
    "Public Safety": ["safety", "manhole", "accident", "unsafe", "lighting"],
}

EXPERTISE_MAP = {
    "Water Management": ["Environmental Engineering", "Civil Engineering", "Water Resources", "Chemistry"],
    "Health": ["Public Health", "Supply Chain Analytics"],
    "Education": ["Education Policy", "Civil Engineering"],
    "Infrastructure": ["Civil Engineering", "Structural Engineering", "Urban Planning"],
    "Agriculture": ["Agriculture Sciences", "Irrigation Planning"],
    "Environment": ["Environmental Science", "Air Quality Monitoring"],
    "Waste Management": ["Environmental Engineering", "Urban Infrastructure"],
    "Public Safety": ["Urban Design", "Public Safety Engineering"],
}


def classify(text: str) -> str:
    lower = text.lower()
    best_category, best_score = "Infrastructure", -1
    for category, keywords in CATEGORY_KEYWORDS.items():
        score = sum(1 for kw in keywords if kw in lower)
        if score > best_score:
            best_category, best_score = category, score
    return best_category


def severity(text: str, affected: int) -> str:
    lower = text.lower()
    if any(w in lower for w in ["contaminat", "collapse", "critical", "outbreak", "toxic"]) or affected > 2500:
        return "Critical"
    if any(w in lower for w in ["shortage", "illness", "damage", "unsafe", "failure"]) or affected > 800:
        return "High"
    if affected > 200:
        return "Medium"
    return "Low"


def required_expertise(category: str) -> List[str]:
    return EXPERTISE_MAP.get(category, ["General Engineering"])


def priority_score(sev: str, affected: int) -> float:
    base = {"Low": 3.5, "Medium": 5.8, "High": 7.8, "Critical": 9.2}[sev]
    boost = min(1.2, affected / 3000)
    return round(min(10, base + boost), 1)
