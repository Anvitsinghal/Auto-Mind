from fastapi import FastAPI
from schemas import Telemetry
from model import load
from agents import *
from database import telemetry_log, bookings

app = FastAPI()
model = load()

@app.post("/predict")
def predict(data: Telemetry):
    X = [[data.temperature, data.vibration, data.coolant, data.battery]]
    prob = model.predict_proba(X)[0][1]
    status = prediction_agent(prob)
    voice = voice_agent(status)
    booking = booking_agent(status)
    rca = rca_agent(status)
    telemetry_log.append(data.dict())
    if booking:
        bookings.append(booking)
    return {
        "risk_score": round(prob, 2),
        "status": status,
        "voice_message": voice,
        "service_booking": booking,
        "rca_insight": rca
    }

@app.get("/dashboard")
def dashboard():
    return {
        "total_records": len(telemetry_log),
        "total_bookings": len(bookings),
        "latest_booking": bookings[-1] if bookings else None
    }
