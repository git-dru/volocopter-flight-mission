# main.py
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from . import models
from .database import engine
from .router import router as flight_router  # import the router

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

models.Base.metadata.create_all(bind=engine)

app.include_router(flight_router, prefix="/api/flight")
