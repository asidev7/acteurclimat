"""
API v1 endpoints
"""
from fastapi import APIRouter
from app.api.v1.invoice import router as invoice_router
from app.api.v1.info import router as info_router
from app.api.v1.senegal import router as senegal_router
from app.api.v1.cote_divoire import router as ci_router
from app.api.v1.burkina_faso import router as bf_router
from app.api.v1.benin import router as bj_router
from app.api.v1.togo import router as tg_router
from app.api.v1.mali import router as ml_router
from app.api.v1.international import router as intl_router

# Créer un routeur pour regrouper tous les endpoints v1
router = APIRouter(prefix="/v1")

# Inclure les routeurs spécifiques
router.include_router(info_router)
router.include_router(invoice_router)
router.include_router(senegal_router)
router.include_router(ci_router)
router.include_router(bf_router)
router.include_router(bj_router)
router.include_router(tg_router)
router.include_router(ml_router)
router.include_router(intl_router)