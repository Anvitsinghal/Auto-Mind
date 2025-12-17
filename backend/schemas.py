from pydantic import BaseModel

class Telemetry(BaseModel):
    temperature: float
    vibration: float
    coolant: float
    battery: float
