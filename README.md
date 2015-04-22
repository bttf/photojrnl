# photojrnl

An Ember/Node.js app for photographers to publish and curate their photos for the viewing public. 

The Node.js app provides server-rendered web-app for public access.

Ember app is served at '/admin' to provide admin controls.

## Pre-reqs

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (or IO.js)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone https://github.com/bttf/photojrnl.git`
* `cd` into directory
* `npm install && bower install`
* `cd ember-app/`
* `npm install && bower install`
* `ember build`
* `cd ..`
* `npm start` to start the node.js web app

## Running / Development 

To develop the node.js web app, follow the steps above

To install and run the Ember app:

* Follow above instructions
* `cd ember-app/`
* `ember serve`
