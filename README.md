# AngularJS - Webpack Starter

##### Quick Start

####### Make sure you have Node version >= 8.0 and NPM >= 5

This is a base boilerplate for for teams still working in AngularJS 1.5++.

> Clone/Download [Repo](https://github.com/pchoi-edr/TechEngr-AngularJS-Build-BoilerPlates.git)
>

```
# install the repo with npm
npm install

# start the server in dev mode
npm start

# build production version
npm build:prod
```

####### Directory Structure

```
angularjs/
  ├──conf/                          * our configuration
  │   ├──html-elements-plugin
  │   │    └──index.js
  │   ├──helpers.js
  │   ├──webpack.common.js          * common webpack config
  │   ├──webpack.dev.js             * dev webpack config
  │   └──webpack.prod.js            * production webpack config
  │
  ├──src/
  │   ├──assets/
  │   ├──scripts/
  │   │   ├──app/
  │   │   │   └──app.js             * App entry file
  │   │   │
  │   │   │
  │   │   │
  │   │   │
  │   │   └──main.js                * Entry File for JS
  │   │
  │   ├──scss/                      * Folder for partial scss files and stubs
  │   ├──styles/                    * Contains main.scss; main entry file for scss
  │   ├──tpls/                      * Contains partial html templates like 1) footer.html, 2) header.html
  │   └──index.html                 * Main HTML template
  │...

```
