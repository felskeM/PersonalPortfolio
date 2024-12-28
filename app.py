import requests
from flask import Flask, jsonify
from flask_cors import CORS  # Importing CORS

app = Flask(__name__)
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

if __name__ == '__main__':
    app.run(debug=True)
