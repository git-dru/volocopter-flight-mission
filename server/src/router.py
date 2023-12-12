# router.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from . import crud, schemas
from .database import SessionLocal

# This function is just a dependency to get the database session.
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

router = APIRouter()

@router.get("/all/", response_model=list[schemas.Flight])
def read_flights(db: Session = Depends(get_db)):
    flights = crud.get_flights(db)
    return flights

@router.post("/", response_model=schemas.Flight)
def create_flight(flight: schemas.FlightCreate, db: Session = Depends(get_db)):
    return crud.create_flight(db, flight)

@router.patch("/{flight_id}", response_model=schemas.Flight)
def update_flight(flight_id: int, flight: schemas.FlightUpdate, db: Session = Depends(get_db)):
    db_flight = crud.get_flight(db, flight_id)
    if db_flight is None:
        raise HTTPException(status_code=404, detail="Flight not found")
    return crud.update_flight(db, flight_id, flight)

@router.delete("/{flight_id}")
def delete_flight(flight_id: int, db: Session = Depends(get_db)):
    db_flight = crud.get_flight(db, flight_id)
    if db_flight is None:
        raise HTTPException(status_code=404, detail="Flight not found")
    crud.delete_flight(db, flight_id)
    return {"status": "success"}
