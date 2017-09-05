Side-Scrolling 2 axis Boilerplate
=================================

Introduction
------------
This project is for learning purposes and should not be deployed in production.

I try to create a boilerplate for side-scroller 2 axis games in the browser with [PixiJS](http://www.pixijs.com/).
The backend is a simple python [Flask](http://flask.pocoo.org/) app.
The collision detection is done by a project named [SAT.js](https://github.com/jriecken/sat-js).

I also want to write the boilerplate in the ECMA 6 specification with the help of [Babel](https://babeljs.io/) and [webpack](https://webpack.github.io/).

And I want to add some cool things like a [blender](https://www.blender.org/) script to make animation spritesheets.

Installation
------------

1. Get the source-code.
2. Create a virtualenv with python3.4 (Use a searchengine for more information)
3. Activate the virtualenv (Also use a searchengine for more information)
4. Install the requirements with pip:
   ```pip install -r requirements.txt```
5. Install node js (if you haven't already)
6. Goto the main folder (the folder with package.json) and install all the necessary node modules:
   ```npm install```
7. Now you should be able to use webpack like:
   ```node_modules/.bin/webpack```

   This will start webpack with the configuration file ```webpack.config.js```.
   After execution webpack should create a new ```backend/static/js/bundle.js```.
   This file contains PixiJS and the gamecode.

Start
-----

Make sure you packed a bundle with webpack (node_modules/.bin/webpack).

You can start the flask backend with:
```python backend/server.py```

Now you can visit ```127.0.0.1:5000``` in your browser. (Use a modern browser with webGL support)

Development
-----------

You can create the gamecode in the ECMA 6 specification.
All files under the ```frontend``` folder will be transformed with the help of [Babel](https://babeljs.io/) and [webpack](https://webpack.github.io/).

If you change the source code of the frontend, don't forget to create a new bundle with webpack:
```node_modules/.bin/webpack```