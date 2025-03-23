from fastapi import FastAPI, BackgroundTasks
from datetime import datetime
from app.audio_capture import capture_audio
from app.noise_reduction import reduce_noise
from app.detection.keyword_detection import keyword_detection
from app.alerts.alert_system import send_alert
from app.alerts.logger import log_event
from HeadPoseDetection.head_pose_detection import run_head_pose_detection
from lip_movement_detection import run_lip_movement_detection
import uvicorn
import threading

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Welcome to the TechXcelerate Hackathon Project"}

@app.post("/start-audio-detection/")
def start_audio_detection(background_tasks: BackgroundTasks):
    background_tasks.add_task(audio_detection_task)
    return {"message": "Audio detection started"}

def audio_detection_task():
    audio_file = 'assets/samples/audio_sample.wav'
    cleaned_file = 'assets/samples/cleaned_audio.wav'

    try:
        while True:
            capture_audio(audio_file, duration=None)
            reduce_noise(audio_file, cleaned_file)
            keywords = ['help', 'answer', 'cheat', 'copy', 'whisper', 'phone', 'google', 'search', 'browser', 'text', 'message', 'call', 'assist', 'solution', 'hint']
            if keyword_detection(cleaned_file, keywords):
                event = "Suspicious Keyword Detected"
                timestamp = datetime.now()
                send_alert(event, timestamp)
                log_event(event, timestamp)
            stop = input("Press 'q' to stop recording or any other key to continue: ")
            if stop.lower() == 'q':
                break
    except KeyboardInterrupt:
        print("Recording stopped by user.")

@app.post("/start-head-pose-detection/")
def start_head_pose_detection():
    threading.Thread(target=run_head_pose_detection).start()
    return {"message": "Head pose detection started"}

@app.post("/start-lip-movement-detection/")
def start_lip_movement_detection():
    threading.Thread(target=run_lip_movement_detection).start()
    return {"message": "Lip movement detection started"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)