"""
Gestionnaires d'erreurs
"""
from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse

async def http_exception_handler(request: Request, exc: HTTPException):
    """Gestionnaire d'exceptions HTTP"""
    return JSONResponse(
        status_code=exc.status_code,
        content={"success": False, "message": exc.detail},
    )