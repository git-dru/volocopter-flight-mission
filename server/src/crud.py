from sqlalchemy.orm import Session

from . import models, schemas

def get_flights(db: Session):
    return db.query(models.Flight).all()

def get_flight(db: Session, flight_id: int):
    return db.query(models.Flight).filter(models.Flight.id == flight_id).first()

def create_flight(db: Session, flight: schemas.FlightCreate):
    db_flight = models.Flight(**flight.dict())
    db.add(db_flight)
    db.commit()
    db.refresh(db_flight)
    return db_flight

def update_flight(db: Session, flight_id: int, flight: schemas.FlightUpdate):
    db_flight = get_flight(db, flight_id)
    if db_flight:
        update_data = flight.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_flight, key, value)
        db.commit()
        db.refresh(db_flight)
    return db_flight

def delete_flight(db: Session, flight_id: int):
    db_flight = get_flight(db, flight_id)
    db.delete(db_flight)
    db.commit()