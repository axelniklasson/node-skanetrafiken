# node-skanetrafiken
[![npm version](https://badge.fury.io/js/node-skanetrafiken.svg)](https://badge.fury.io/js/node-skanetrafiken)
[![Build Status](https://travis-ci.org/axelniklasson/node-skanetrafiken.svg?branch=master)](https://travis-ci.org/axelniklasson/node-skanetrafiken)
[![Coverage Status](https://coveralls.io/repos/axelniklasson/node-skanetrafiken/badge.svg?branch=master)](https://coveralls.io/r/axelniklasson/node-skanetrafiken?branch=master)
[![GitHub issues](https://img.shields.io/github/issues/axelniklasson/node-skanetrafiken.svg)](https://github.com/axelniklasson/node-skanetrafiken/issues)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

Node.js wrapper for Skånetrafiken's Open API. I recently had a night off and thought it would be fun to build a small node.js-wrapper for their API and in the meantime learn more about publishing npm projects and such. Aside from wrapping all endpoints in handy functions, providing the possibility to receive the data from their API in JSON instead of XML is a handy feature as well.

Skånetrafikens official API documentation can be found [here](http://www.labs.skanetrafiken.se/api.asp) and this wrapper is written for the latest version (v2.2).

## Implemented endpoints
Below are the implemented endpoints.
- [x] /querypage.asp
- [x] /resultspage.asp
- [x] /querystation.asp
- [x] /neareststation.asp
- [x] /stationresults.asp
- [x] /trafficmeans.asp
- [x] /journeypath.asp

Documentation for this package can be found in the Wiki.

## Limitations
### XML to JSON conversion
I am currently using a package called [xml2js](https://www.npmjs.com/package/xml2js) for the conversion between XML and JSON and no other formatting of the data will be provided. It is to be used as-is. In the future, returning data in XML Should also be supported.

## Installation
This package is published to [npm](https://www.npmjs.com/package/node-skanetrafiken) and can easily be installed using
```
npm install node-skanetrafiken
```

## Usage
Below shows a simple example of finding a stop by name. Docs for all endpoints can be found in the [Wiki](https://github.com/axelniklasson/node-skanetrafiken/wiki/API-documentation).
```
// demo.js

var nodeSkanetraiken = require('node-skanetrafiken');

nodeSkanetraiken.findStop({ name: 'Kristianstad' }, function(results, err) {
    if (!err) {
        // Do something with the results
    }
});
```

## Hack on this
### Getting started
```
git clone https://github.com/axelniklasson/node-skanetrafiken.git
npm install
```

Tests are run using
```
npm test
```

### Contributing
Pull Requests are always welcome. All PRs Should contain appropriate tests and submitted to the ``development`` branch. PRs that break the build in Travis will not be accepted, for obvious reasons.

## License
This package is MIT licensed.
