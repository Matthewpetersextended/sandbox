"""
Database models for presentations
"""
from sqlalchemy import Column, String, Integer, DateTime, JSON, Text, Boolean
from sqlalchemy.sql import func
from app.database import Base


class Presentation(Base):
    """Presentation model"""
    __tablename__ = "presentations"
    
    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, nullable=False, index=True)
    
    # Basic info
    title = Column(String(255), nullable=False)
    description = Column(Text)
    grade_level = Column(String(50))
    subject = Column(String(100))
    
    # Generation info
    generation_method = Column(String(50))  # topic, file, standards
    topic = Column(String(500))
    learning_objectives = Column(JSON)
    standards = Column(JSON)
    
    # Content
    slides = Column(JSON)  # Array of slide objects
    theme = Column(String(100), default="default")
    
    # Metadata
    slide_count = Column(Integer, default=0)
    status = Column(String(50), default="draft")  # draft, generating, completed, error
    generation_time_seconds = Column(Integer)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Privacy
    is_public = Column(Boolean, default=False)
    
    def __repr__(self):
        return f"<Presentation {self.id}: {self.title}>"
EOF