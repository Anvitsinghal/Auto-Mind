import joblib
from sklearn.ensemble import RandomForestClassifier
from data_generator import generate_data

def train():
    df = generate_data()
    X = df[["temperature", "vibration", "coolant", "battery"]]
    y = df["risk"]
    model = RandomForestClassifier(n_estimators=100)
    model.fit(X, y)
    joblib.dump(model, "trained_model.pkl")

def load():
    return joblib.load("trained_model.pkl")
