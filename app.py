import requests
from flask import Flask, jsonify, render_template
from flask_cors import CORS

app = Flask(__name__, 
            template_folder='templates', 
            static_folder='static')
CORS(app)  # Enable CORS for all routes

def get_github_data(username):
    url = f'https://api.github.com/users/{username}/repos'
    response = requests.get(url)
    repos = response.json()

    repo_data = []
    for repo in repos:
        repo_data.append({
            'name': repo['name'],
            'url': repo['html_url'],
            'description': repo['description'] or 'No description available',
            'stars': repo['stargazers_count'],
        })
    return repo_data

@app.route('/api/repos')
def github_repos():
    username = 'felskeM'  # Change this to your GitHub username
    data = get_github_data(username)
    return jsonify(data)

#7zlj6prbtmemkcauqss763v75edcmt4zcgdo22ionj47sgvwunbp4yyd.onion

@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__':
    # Run the Flask app on localhost port 5000
    app.run(host='127.0.0.1', port=5000, debug=True)