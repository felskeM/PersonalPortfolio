import threading
import time
import requests
import webbrowser
from flask import Flask, request, render_template

app = Flask(__name__)

def open_browser():
    time.sleep(1)
    webbrowser.open('http://127.0.0.1:5000')

def main():
    threading.Thread(target=open_browser).start()
    app.run(host='0.0.0.0', port=5000, debug=True, use_reloader=False)


if __name__ == 'main':
    main()