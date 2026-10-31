from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/test', methods=['GET'])
def test_api():
    return jsonify({"message": "Połączenie z Flaskiem działa!"})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')