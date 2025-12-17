def prediction_agent(score):
    return "HIGH_RISK" if score > 0.6 else "NORMAL"

def voice_agent(status):
    if status == "HIGH_RISK":
        return "Vehicle shows early failure signs. Service recommended."
    return "Vehicle health normal."

def booking_agent(status):
    if status == "HIGH_RISK":
        return {"slot": "Tomorrow 4 PM", "center": "Nearest Authorized Service"}
    return None

def rca_agent(status):
    if status == "HIGH_RISK":
        return "Repeated overheating pattern detected across similar vehicles"
    return "No anomaly pattern detected"

def ueba_agent(action):
    allowed = ["PREDICT", "CALL", "BOOK", "ANALYZE"]
    return action in allowed
