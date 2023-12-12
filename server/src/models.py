from sqlalchemy import Column, Integer, String, Enum
from enum import Enum as PyEnum
from .database import Base

class FlightState(PyEnum):
    PRE_FLIGHT = "Pre-Flight"
    FLIGHT = "Flight"
    POST_FLIGHT = "Post-Flight"

class Flight(Base):
    __tablename__ = "flights"

    id = Column(Integer, primary_key=True, index=True)
    state = Column(Enum(FlightState), index=True)
    title = Column(String, index=True, nullable=False)
    description = Column(String, index=True, nullable=False)
