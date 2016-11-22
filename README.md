# node-skanetrafiken
Node.js wrapper for Skånetrafiken's Open API. I recenelty had a night off and though it would be fun to build a small node.js-wrapper for their API and in the meantime learn more about publishing npm projects and such. Aside from wrapping all endpoints in handy functions, providing the possibility to receive the data from their API in JSON instead of XML is a handy feature as well.

Skånetrafikens official API documentation can be found [here](http://www.labs.skanetrafiken.se/api.asp) and this wrapper is written for the latest version (v2.2).

## Features
Below are a small set of featured intended to be implemented.
[ ] Promise-based wrappers for all API endpoints
[ ] Possibility to receive data in either XML or JSON (only XML is supported by the official API)

## Dependencies
* [Request](https://www.npmjs.com/package/request)

## License
This package is MIT licensed.
