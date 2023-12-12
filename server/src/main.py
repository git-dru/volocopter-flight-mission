from fastapi import APIRouter, FastAPI
from starlette.middleware.cors import CORSMiddleware


api_router = APIRouter(prefix="/api")


@api_router.get("/health", include_in_schema=False)
def healthcheck():
    """Check if API is up and running."""
    return {"status": "ok"}


app = FastAPI(
    title="volocopter_code_challenge",
    description="""Volocopter Code Challenge API.""",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)
