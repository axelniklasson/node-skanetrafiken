var request = require('request');
var xmlParser = require('xml2js');
var config = require('../config');

module.exports = {
    /*
    * Finds all departure and arrival stops within circle of a specified radius,
    * where center point of circle is specified
    *
    * @param x int : x coordinate in RT 90 system
    * @param y int : y coordinate in RT 90 system
    * @param radius int : radius in meters (optional)
    * @param cb function : callback function
    *
    * @returns an array of the nearest stops
    */
    findNearestStops: function(opts, cb) {
        if (opts.x && opts.y) {
            var reqString = config.baseURL + '/neareststation.asp?x=' + encodeURIComponent(opts.x)
            + '&y=' + encodeURIComponent(opts.y);

            if (opts.radius) {
                reqString += '&radius=' + encodeURIComponent(opts.radius);
            }

            request(reqString, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    if (config.returnXML) {
                        /* istanbul ignore next */
                        return cb(body, null);
                    } else {
                        xmlParser.parseString(body, function (err, result) {
                            if (!err && result) {
                                return cb(result['soap:Envelope']['soap:Body'][0]['GetNearestStopAreaResponse'][0]['GetNearestStopAreaResult'][0]['NearestStopAreas'][0]['NearestStopArea'], null);
                            } else {
                                /* istanbul ignore next */
                                return cb(null, err);
                            }
                        });
                    }

                } else {
                    /* istanbul ignore next */
                    return cb(null, error);
                }
            });
        } else {
            return cb(null, 'Parameters x and y must be specified.');
        }
    }
}
