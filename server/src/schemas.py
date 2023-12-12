from pydantic import BaseModel, constr
from .models import FlightState

class FlightBase(BaseModel):
    state: FlightState
    title: constr(min_length=1)
    description: constr(min_length=1)

class FlightCreate(FlightBase):
    pass

class FlightUpdate(FlightBase):
    pass

class Flight(FlightBase):
    id: int

    class Config:
        orm_mode = True