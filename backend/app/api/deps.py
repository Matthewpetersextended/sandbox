"""
API dependencies
"""
from fastapi import Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.core.auth import get_current_user


async def get_current_user_id(user: dict = Depends(get_current_user)) -> str:
    """Get current user ID from token"""
    return user.get("uid")
EOF