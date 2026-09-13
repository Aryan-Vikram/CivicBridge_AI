from pydantic import BaseModel
from typing import List, Optional


class AnalyzeRequest(BaseModel):
    title: str
    description: str
    affected_citizens: Optional[int] = 0
    district: Optional[str] = None


class AnalyzeResponse(BaseModel):
    category: str
    severity: str
    priority_score: float
    affected_population: int
    required_expertise: List[str]
    confidence: float


class ClassifyRequest(BaseModel):
    title: str
    description: str


class DuplicateRequest(BaseModel):
    title: str
    description: str
    district: Optional[str] = None


class MatchRequest(BaseModel):
    category: str
    required_expertise: List[str]
    lat: float
    lng: float


class ExplainMatchRequest(BaseModel):
    university_id: str
    match_score: float
