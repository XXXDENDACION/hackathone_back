
import subprocess
from random import random
import requests
import os
import shutil
while True:
    try:
        shutil.rmtree("content/steps")
        os.mkdir("content/steps")
    except:
        os.mkdir("content/steps")
    iterations = 200 + int(random()*400)
    num_words = 2 + int(random()*5)
    response = requests.get(("https://random-word-api.herokuapp.com/word?number=" + str(num_words))).json()
    sentence = "\""
    for r in response:
        sentence += (r + " ")
    sentence += "\""
    res = subprocess.run(["/usr/bin/python3", "torch_run.py", str(iterations), sentence])
    res = subprocess.check_output(["/bin/imgur", "content/movie.gif"])
    print(res.decode("utf-8").split("page:")[0][:-1])
    ### REQUEST ON BACKEND
