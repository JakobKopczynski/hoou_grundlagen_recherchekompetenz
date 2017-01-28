# hoou_grundlagen_recherchekompetenz
Hamburg Open Online University Grundlagen Recherchekompetenz

## Built
1. get node.js
1. clone this repo
1. run "npm install"

## Use it on GitHub Pages
* [English](https://pascalpflaum.github.io/hoou_grundlagen_recherchekompetenz/public/en.html)
* [German - Deutsch](https://pascalpflaum.github.io/hoou_grundlagen_recherchekompetenz/public/de.html)

## Host it
It is just plain HTML/JS/CSS, so use your preferred server or hoster.

1. clone or download the repo
1. make the "public" folder accessible

## Translate it

1. copy one of the existing languages in /content
1. translate it
1. add the language to ./Gruntfile.js
1. optional (make the translation accessable in the navigation in ./src/main.js

## Data Storage for feedback

in /js/feedbackStorage are two sample implementations
* ajax.js - Get feedback data from and send feedback data to an HTTP Endpoint
* baqend.js - Implementation for a public BaaS. [Baqend](https://www.baqend.com/)

## License

* Code: MIT
* Content: CC BY-NC-SA 3.0
* Icons CC 3.0 BY [Material UI by Google](http://www.flaticon.com/packs/material-design)
