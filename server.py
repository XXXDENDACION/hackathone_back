import subprocess
from random import random
import requests
while True:
    iterations = 40 + int(random()*50)
    response = requests.get("https://random-word-api.herokuapp.com/word?number=3").json()
    sentence = "\"" + response[0] + " " + response[1] + " " + response[2] + "\""
    res = subprocess.run(["/usr/bin/python", "torch_run.py", str(iterations), ])
    ### REQUEST ON BACKEND
