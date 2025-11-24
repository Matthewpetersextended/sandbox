"""
Presentations API endpoints
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import uuid

from app.database import get_db
from app.models.presentation import Presentation
from app.schemas.presentation import PresentationCreate, PresentationResponse
from app.api.deps import get_current_user_id

router = APIRouter()


@router.post("/", response_model=PresentationResponse, status_code=201)
async def create_presentation(
    presentation: PresentationCreate,
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user_id)
):
    """Create a new presentation"""
    
    # Create presentation in database
    db_presentation = Presentation(
        id=str(uuid.uuid4()),
        user_id=user_id,
        title=presentation.title,
        description=presentation.description,
        grade_level=presentation.grade_level,
        subject=presentation.subject,
        generation_method=presentation.generation_method,
        topic=presentation.topic,
        learning_objectives=presentation.learning_objectives,
        standards=presentation.standards,
        theme=presentation.theme,
        slide_count=presentation.slide_count,
        slides=[],
        status="draft"
    )
    
    db.add(db_presentation)
    db.commit()
    db.refresh(db_presentation)
    
    return db_presentation


@router.get("/", response_model=List[PresentationResponse])
async def list_presentations(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user_id)
):
    """List all presentations for current user"""
    presentations = db.query(Presentation)\
        .filter(Presentation.user_id == user_id)\
        .offset(skip)\
        .limit(limit)\
        .all()
    
    return presentations


@router.get("/{presentation_id}", response_model=PresentationResponse)
async def get_presentation(
    presentation_id: str,
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user_id)
):
    """Get a specific presentation"""
    presentation = db.query(Presentation)\
        .filter(
            Presentation.id == presentation_id,
            Presentation.user_id == user_id
        )\
        .first()
    
    if not presentation:
        raise HTTPException(status_code=404, detail="Presentation not found")
    
    return presentation


@router.delete("/{presentation_id}", status_code=204)
async def delete_presentation(
    presentation_id: str,
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user_id)
):
    """Delete a presentation"""
    presentation = db.query(Presentation)\
        .filter(
            Presentation.id == presentation_id,
            Presentation.user_id == user_id
        )\
        .first()
    
    if not presentation:
        raise HTTPException(status_code=404, detail="Presentation not found")
    
    db.delete(presentation)
    db.commit()
    
    return None
EOF