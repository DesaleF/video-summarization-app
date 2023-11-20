from flask import Flask, jsonify, stream_with_context, Response, request
from threading import Thread
from flask_cors import CORS
import time

app = Flask(__name__)
CORS(app)

video_progress = {}  # Dictionary to store progress of each video by ID

def process_video(video_id):
    for i in range(1, 101):
        time.sleep(0.1)  # Simulating processing time
        video_progress[video_id] = i

@app.route('/start_processing', methods=['POST'])
def start_processing():
    data = request.json
    if not data or 'video_id' not in data:
        return jsonify({"error": "video_id is required"}), 400

    video_id = data['video_id']
    video_progress[video_id] = 0
    thread = Thread(target=process_video, args=(video_id,))
    thread.start()
    return jsonify({"status": f"processing started for video {video_id}"}), 200

@app.route('/progress/<video_id>')
def get_progress(video_id):
    def generate():
        while video_progress.get(video_id, 0) < 100:
            yield f"data: {video_progress.get(video_id, 0)}\n\n"
            time.sleep(0.5)
        yield f"data: {video_progress.get(video_id, 0)}\n\n"
    return Response(stream_with_context(generate()), content_type='text/event-stream')

if __name__ == '__main__':
    app.run(debug=True)
