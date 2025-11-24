"""
Pydantic schemas for API validation
"""
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime


class SlideContent(BaseModel):
    """Individual slide content"""
    slide_number: int
    title: str
    content: str
    notes: Optional[str] = None
    layout: str = "title-content"


class PresentationCreate(BaseModel):
    """Schema for creating a presentation"""
    title: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None
    grade_level: str
    subject: str
    generation_method: str  # topic, file, standards
    topic: Optional[str] = None
    learning_objectives: Optional[List[str]] = None
    standards: Optional[List[str]] = None
    theme: str = "default"
    slide_count: int = Field(default=10, ge=5, le=30)


class PresentationResponse(BaseModel):
    """Schema for presentation response"""
    id: str
    user_id: str
    title: str
    description: Optional[str]
    grade_level: str
    subject: str
    slides: List[Dict[str, Any]]
    theme: str
    slide_count: int
    status: str
    created_at: datetime
    updated_at: Optional[datetime]
    
    class Config:
        from_attributes = True


class GenerationRequest(BaseModel):
    """Schema for AI generation request"""
    presentation_id: str
    prompt: str
    slide_count: int = 10
EOF