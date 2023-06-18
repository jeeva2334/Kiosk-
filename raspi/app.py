from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/print', methods=['POST'])
def print_message():
    resp = request.get_json()
    print(resp)
    return jsonify(resp)

if __name__ == '__main__':
    app.run(debug=True)
