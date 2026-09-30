from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock Database
db = {
    "personnel_alerts": [
        {
            "id": "P-1047",
            "risk": "Elevated",
            "status": "Pending",
            "reasons": [
                {"icon": "clock", "label": "Extended Deployment (98 days)"},
                {"icon": "heart", "label": "Sleep score decline (-22% over 7d)"},
                {"icon": "brain", "label": "Self-reported stress increase"}
            ],
            "recommendation": "Confidential Check-in & Leave Review"
        },
        {
            "id": "P-2210",
            "risk": "Moderate",
            "status": "Pending",
            "reasons": [
                {"icon": "calendar", "label": "Leave Gap (11 months)"},
                {"icon": "activity", "label": "High Duty Hours (avg 82h/wk)"}
            ],
            "recommendation": "Proactive Workload Rebalancing"
        },
        {
            "id": "P-3042",
            "risk": "Elevated",
            "status": "Pending",
            "reasons": [
                {"icon": "activity", "label": "High Training Load (4 weeks continuous)"},
                {"icon": "clock", "label": "Irregular Shifts (Night shift volatility)"}
            ],
            "recommendation": "Immediate Shift Normalization"
        },
        {
            "id": "P-4199",
            "risk": "Moderate",
            "status": "Pending",
            "reasons": [
                {"icon": "brain", "label": "Fatigue Indicator (HRV Drop)"},
                {"icon": "calendar", "label": "Frequent Transfers (3 in 18 months)"}
            ],
            "recommendation": "Monitor & Recommend Unit Stability"
        },
        {
            "id": "P-5501",
            "risk": "Elevated",
            "status": "Pending",
            "reasons": [
                {"icon": "heart", "label": "Physiological Stress Baseline High"},
                {"icon": "brain", "label": "Self-reported emotional exhaustion"}
            ],
            "recommendation": "Urgent Medical/Welfare Officer Consult"
        }
    ],
    "commander_stats": {
        "total_strength": 142,
        "readiness": 72,
        "elevated_risks": 12,
        "avg_duty_hours": 74
    }
}

class ReviewRequest(BaseModel):
    personnel_id: str

@app.get("/api/commander/stats")
def get_commander_stats():
    return db["commander_stats"]

@app.get("/api/welfare/alerts")
def get_welfare_alerts():
    return db["personnel_alerts"]

@app.post("/api/welfare/review")
def review_case(req: ReviewRequest):
    for p in db["personnel_alerts"]:
        if p["id"] == req.personnel_id:
            p["status"] = "In Review"
            return {"success": True, "message": f"Case {req.personnel_id} marked as In Review"}
    return {"success": False, "message": "Personnel not found"}

@app.post("/api/auth/logout")
def logout():
    return {"success": True, "message": "Logged out successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
