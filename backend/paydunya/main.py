"""
Point d'entrée principal de l'application
"""
from fastapi import FastAPI, HTTPException
from app.config.settings import API_TITLE, API_DESCRIPTION, API_VERSION
from app.api.v1 import router as api_v1_router
from app.utils.error_handlers import http_exception_handler

# Créer l'application FastAPI
app = FastAPI(
    title=API_TITLE,
    description=API_DESCRIPTION,
    version=API_VERSION
)

# Ajouter les gestionnaires d'erreurs
app.add_exception_handler(HTTPException, http_exception_handler)

# Inclure les routes de l'API v1
app.include_router(api_v1_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)