from flask import Flask, jsonify, request
import requests
from flaskext.mysql import MySQL
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
mysql = MySQL()

# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'user'
app.config['MYSQL_DATABASE_PASSWORD'] = 'password'
app.config['MYSQL_DATABASE_DB'] = 'posts'
app.config['MYSQL_DATABASE_HOST'] = '172.24.9.148'

mysql.init_app(app)


@app.route("/api/post", methods=["POST"])
def insert_post():
    req = request.get_json()
    _title = req['title']
    _text = req['text']
    conn = mysql.connect()
    cursor = conn.cursor()
    insertQuery = "INSERT INTO textData (title, text) VALUES (%s, %s)"
    cursor.execute(insertQuery, (_title, _text))
    conn.commit()
    conn.close()
    return request.data

@app.route("/api/posts", methods=["GET"])
def get_posts():
    cur = mysql.connect().cursor()
    cur.execute('''select * from posts.textData''')
    r = [dict((cur.description[i][0], value)
              for i, value in enumerate(row)) for row in cur.fetchall()]
    return jsonify(r)

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

if __name__ == "__main__":
    app.run(host='0.0.0.0',debug=True, port=80)