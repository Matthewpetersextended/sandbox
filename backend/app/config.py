cat > backend/app/config.py << 'EOF'
"""
Application Configuration
Manages all environment variables and settings
"""
from pydantic_settings import BaseSettings
from typing import Optional
import os


class Settings(BaseSettings):
    """Application settings from environment variables"""
    
    # Application
    APP_NAME: str = "AI Presentation Maker"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False
    ENVIRONMENT: str = "development"
    
    # API
    API_V1_PREFIX: str = "/api/v1"
    BACKEND_CORS_ORIGINS: list = ["http://localhost:3000", "http://localhost:8000"]
    
    # Database
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/presentation_maker"
    DB_POOL_SIZE: int = 10
    DB_MAX_OVERFLOW: int = 20
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"
    CACHE_TTL: int = 3600  # 1 hour
    
    # Firebase
    FIREBASE_CREDENTIALS_PATH: str = "./firebase-credentials.json"
    FIREBASE_STORAGE_BUCKET: Optional[str] = None
    
    # AI Services
    ANTHROPIC_API_KEY: str = ""
    ANTHROPIC_MODEL: str = "claude-sonnet-4-20250514"
    ANTHROPIC_MAX_TOKENS: int = 4096
    
    OPENAI_API_KEY: Optional[str] = None
    OPENAI_MODEL: str = "gpt-4-turbo-preview"
    
    # Unsplash (for images)
    UNSPLASH_ACCESS_KEY: Optional[str] = None
    
    # Celery
    CELERY_BROKER_URL: str = "redis://localhost:6379/1"
    CELERY_RESULT_BACKEND: str = "redis://localhost:6379/2"
    
    # Rate Limiting (Educational)
    MAX_PRESENTATIONS_PER_USER: int = 100
    MAX_GENERATIONS_PER_DAY: int = 10  # Free tier
    MAX_SLIDES_PER_PRESENTATION: int = 30
    
    # Content Safety
    ENABLE_PROFANITY_FILTER: bool = True
    ENABLE_CONTENT_MODERATION: bool = True
    
    # FERPA/COPPA Compliance
    MIN_USER_AGE: int = 13  # COPPA requirement
    REQUIRE_PARENTAL_CONSENT: bool = True
    ENABLE_DATA_ENCRYPTION: bool = True
    
    # File Storage
    MAX_FILE_SIZE_MB: int = 10
    ALLOWED_FILE_TYPES: list = [".pdf", ".docx", ".txt", ".jpg", ".png"]
    
    # Security
    SECRET_KEY: str = "change-this-in-production-use-openssl-rand-hex-32"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    # Monitoring
    SENTRY_DSN: Optional[str] = None
    ENABLE_LOGGING: bool = True
    LOG_LEVEL: str = "INFO"
    
    class Config:
        env_file = ".env"
        case_sensitive = True


# Global settings instance
settings = Settings()
EOF