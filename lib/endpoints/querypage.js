var request = require('request');
var xmlParser = require('xml2js');
var config = require('../config');

module.exports = {

    /*
    * Finds all departure and arrival stops matching from and to.
    *
    * @param from string : string matching departure stop
    * @param to string : string matching arrival stop
    * @param cb function : callback function
    *
    * @returns an array of from- and to-stops
    */
    findStartAndStop: function(opts, cb) {
        if (opts.from && opts.to) {
            var reqString = config.baseURL + '/querypage.asp?inpPointfr=' + encodeURIComponent(opts.from)
            + '&inpPointTo=' + encodeURIComponent(opts.to);

            request(reqString, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    if (config.returnXML) {
                        /* istanbul ignore next */
                        return cb(body, null)
                    } else {
                        xmlParser.parseString(body, function (err, result) {
                            if (!err && result) {
                                var resultObj = { from: [], to: [] };
                                resultObj.from = result['soap:Envelope']['soap:Body'][0]['GetStartEndPointResponse'][0]['GetStartEndPointResult'][0]['StartPoints'][0]['Point'];
                                resultObj.to = result['soap:Envelope']['soap:Body'][0]['GetStartEndPointResponse'][0]['GetStartEndPointResult'][0]['EndPoints'][0]['Point'];
                                return cb(resultObj, null);
                            } else {
                                /* istanbul ignore next */
                                return cb(null, error);
                            }
                        });
                    }

                } else {
                    /* istanbul ignore next */
                    return cb(null, error);
                }
            });
        } else {
            return cb(null, 'Parameters from and to must be specified.');
        }
    }
}
