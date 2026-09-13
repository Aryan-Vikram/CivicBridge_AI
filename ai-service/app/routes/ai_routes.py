from fastapi import APIRouter
from app.models.schemas import (
    AnalyzeRequest, AnalyzeResponse, ClassifyRequest,
    DuplicateRequest, MatchRequest, ExplainMatchRequest,
)
from app.services import nlp_engine, matching_engine

router = APIRouter(prefix="/ai", tags=["ai"])


@router.post("/analyze-problem", response_model=AnalyzeResponse)
def analyze_problem(req: AnalyzeRequest):
    text = f"{req.title} {req.description}"
    category = nlp_engine.classify(text)
    sev = nlp_engine.severity(text, req.affected_citizens or 0)
    return AnalyzeResponse(
        category=category,
        severity=sev,
        priority_score=nlp_engine.priority_score(sev, req.affected_citizens or 0),
        affected_population=req.affected_citizens or 0,
        required_expertise=nlp_engine.required_expertise(category),
        confidence=0.88,
    )


@router.post("/classify")
def classify(req: ClassifyRequest):
    return {"category": nlp_engine.classify(f"{req.title} {req.description}")}


@router.post("/detect-duplicates")
def detect_duplicates(req: DuplicateRequest):
    # Mock: a real implementation would run semantic similarity search
    # against stored problem embeddings for the same district/category.
    return {"duplicates": [], "count": 0}


@router.post("/calculate-priority")
def calculate_priority(severity: str, affected_citizens: int = 0):
    return {"priority_score": nlp_engine.priority_score(severity, affected_citizens)}


@router.post("/match-university")
def match_university(req: MatchRequest):
    ranked = matching_engine.rank_universities(req.required_expertise, req.lat, req.lng)
    return {"matches": ranked}


@router.post("/explain-match")
def explain_match(req: ExplainMatchRequest):
    return {
        "university_id": req.university_id,
        "reasons": [
            "Relevant expertise on faculty",
            "Strong historical success rate",
            "Required laboratory infrastructure available",
            "Suitable current workload",
        ],
    }
