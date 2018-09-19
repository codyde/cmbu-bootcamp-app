from flask import Flask, jsonify, request
import requests
import json
from flask_cors import CORS
import psycopg2
from psycopg2.extras import RealDictCursor
from flask_socketio import SocketIO, emit
from gevent import monkey
from threading import Thread

monkey.patch_all()

app = Flask(__name__)
app.secret_key = "super secret key"
socketio = SocketIO(app)
CORS(app)
thread = None


@app.route("/api/post", methods=["POST"])
def insert_post():
    req = request.get_json()
    _title = req['title']
    _text = req['text']
    conn = psycopg2.connect("host=db dbname=posts user=postgres password=postgres_password")
    cur = conn.cursor()
    cur.execute("INSERT INTO textData (title, text) VALUES (%s, %s)", (_title, _text))
    conn.commit()
    print("Data push happening now")
    return request.data

@app.route("/api/posts", methods=["GET"])
def get_posts():
    conn = psycopg2.connect("host=db dbname=posts user=postgres password=postgres_password")
    cur = conn.cursor(cursor_factory=RealDictCursor)
    data = cur.execute('SELECT * FROM textData')
    test = cur.fetchall()
    return jsonify(test)

@app.route("/api/health", methods=["GET"])
def get_health():
    stats = "{'status':'completed','platform':'healthy'}"
    return jsonify(stats)

@socketio.on('create')
def on_create(data):
    emit('join_room', {'room': 'the pants room'})

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

if __name__ == "__main__":
    app.run(host='0.0.0.0',debug=True, port=80)
