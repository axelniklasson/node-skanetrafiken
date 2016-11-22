var request = require('request');
var xmlParser = require('xml2js');
var config = require('./config');

/*
* Module containing all wrapper methods related to stops.
*/
module.exports = {
    /*
    * Finds all stops matching name.
    *
    * @param name string : string matching desired stop
    * @param cb function : callback function
    *
    * @returns an array of stops
    */
    findStop: function(name, cb) {
        if (name) {
            var reqString = config.baseURL + '/querystation.asp?inpPointfr=' + encodeURIComponent(name);

            request(reqString, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    if (config.returnXML) {
                        cb(body, null);
                    } else {
                        xmlParser.parseString(body, function (err, result) {
                            if (!err && result) {
                                cb(result['soap:Envelope']['soap:Body'][0]['GetStartEndPointResponse'][0]['GetStartEndPointResult'][0]['StartPoints'][0]['Point'], null);
                            } else {
                                cb(null, error);
                            }
                        });
                    }
                } else {
                    cb(null, error);
                }
            });
        } else {
            cb(null, 'Name must be specified.');
        }
    },

    /*
    * Finds all department and arrival stops matching from and to.
    *
    * @param from string : string matching department stop
    * @param to string : string matching arrival stop
    * @param cb function : callback function
    *
    * @returns an array of from- and to-stops
    */
    findStartAndStop: function(from, to, cb) {
        if (from && to) {
            var reqString = config.baseURL + '/querypage.asp?inpPointfr=' + encodeURIComponent(from)
            + '&inpPointTo=' + encodeURIComponent(to);

            request(reqString, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    if (config.returnXML) {
                        cb(body, null)
                    } else {
                        xmlParser.parseString(body, function (err, result) {
                            if (!err && result) {
                                var resultObj = { from: [], to: [] };
                                resultObj.from = result['soap:Envelope']['soap:Body'][0]['GetStartEndPointResponse'][0]['GetStartEndPointResult'][0]['StartPoints'][0]['Point'];
                                resultObj.to = result['soap:Envelope']['soap:Body'][0]['GetStartEndPointResponse'][0]['GetStartEndPointResult'][0]['EndPoints'][0]['Point'];
                                cb(JSON.stringify(resultObj), null);
                            } else {
                                cb(null, error);
                            }
                        });
                    }

                } else {
                    cb(null, error);
                }
            });
        } else {
            cb(null, 'From and to must be specified.');
        }
    },

    /*
    * Finds all department and arrival stops within circle of a specified radius,
    * where center point of circle is specified
    *
    * @param x int : x coordinate in RT 90 system
    * @param x int : x coordinate in RT 90 system
    * @param radius int : radius in meters (optional)
    * @param cb function : callback function
    *
    * @returns an array of the nearest stops
    */
    findNearestStops: function(x, y, radius, cb) {
        if (!x || !y) {
            cb(null, 'X and Y must be specified.');
        }

        var reqString = config.baseURL + '/neareststation.asp?x=' + encodeURIComponent(x)
        + '&y=' + encodeURIComponent(y);

        if (radius && typeof radius !== 'function') {
            reqString += '&radius=' + radius
        } else if (radius && typeof radius === 'function') {
            cb = radius;
        }

        request(reqString, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                if (config.returnXML) {
                    cb(body, null);
                } else {
                    xmlParser.parseString(body, function (err, result) {
                        if (!err && result) {
                            cb(result['soap:Envelope']['soap:Body'][0]['GetNearestStopAreaResponse'][0]['GetNearestStopAreaResult'][0]['NearestStopAreas'][0]['NearestStopArea'], null);
                        } else {
                            cb(null, err);
                        }
                    });
                }

            } else {
                cb(null, error);
            }
        });
    }
};
