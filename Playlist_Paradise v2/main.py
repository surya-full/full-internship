from flask import Flask, render_template, request, jsonify
import requests
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/spotify/search')
def search_spotify():
    search_query = request.args.get('search')
    if not search_query:
        return jsonify({'error': 'No search query provided'})
    try:
        url = "https://spotify81.p.rapidapi.com/search"

        querystring = {"q":search_query,"type":"multi","offset":"0","limit":"10","numberOfTopResults":"5"}

        headers = {
	        "X-RapidAPI-Key": "431293fbd2msh685c96f428f44c6p1f147ejsn46abd96a27ca",
	        "X-RapidAPI-Host": "spotify81.p.rapidapi.com"
            }
        response = requests.request("GET", url, headers=headers, params=querystring)
        response.raise_for_status()
        data = json.loads(response.text)
        return render_template('index.html', data=data)
    except requests.exceptions.HTTPError as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
