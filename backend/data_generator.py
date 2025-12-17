import numpy as np
import pandas as pd

def generate_data(n=5000):
    temp = np.random.normal(85, 8, n)
    vibration = np.random.normal(0.25, 0.08, n)
    coolant = np.random.normal(60, 15, n)
    battery = np.random.normal(12.4, 0.5, n)
    risk = ((temp > 95) | (vibration > 0.4) | (coolant < 40)).astype(int)
    return pd.DataFrame({
        "temperature": temp,
        "vibration": vibration,
        "coolant": coolant,
        "battery": battery,
        "risk": risk
    })
