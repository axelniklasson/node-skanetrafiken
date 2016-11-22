# node-skanetrafiken
[![Build Status](https://travis-ci.org/axelniklasson/node-skanetrafiken.svg?branch=feature%2Ftests)](https://travis-ci.org/axelniklasson/node-skanetrafiken)
[![GitHub issues](https://img.shields.io/github/issues/axelniklasson/node-skanetrafiken.svg)](https://github.com/axelniklasson/node-skanetrafiken/issues)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

Node.js wrapper for Skånetrafiken's Open API. I recenelty had a night off and though it would be fun to build a small node.js-wrapper for their API and in the meantime learn more about publishing npm projects and such. Aside from wrapping all endpoints in handy functions, providing the possibility to receive the data from their API in JSON instead of XML is a handy feature as well.

Skånetrafikens official API documentation can be found [here](http://www.labs.skanetrafiken.se/api.asp) and this wrapper is written for the latest version (v2.2).

## Features
Below are a small set of featured intended to be implemented.
- [ ] Wrappers for all API-based endpoints
- [ ] Return data in JSON (XML is supported by the official API, so it will be included as-is without any modification)

## Usage
Below shows a simple example of finding a stop by name. Docs will be added.
```
// index.js

var nodeSkanetraiken = require('node-skanetrafiken');

nodeSkanetraiken.findStop('Kristianstad', function(results, err) {
    if (!err) {
        // Do something with the results matching the query
    }
});
```

## Dependencies
* [Request](https://www.npmjs.com/package/request)
* [xml2js](https://www.npmjs.com/package/xml2js)

## License
This package is MIT licensed.
