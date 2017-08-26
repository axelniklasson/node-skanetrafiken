var request = require('request');
var xmlParser = require('xml2js');
var config = require('../config');

module.exports = {
    /*
    * Finds all stops matching name.
    *
    * @param name string : string matching desired stop
    * @param cb function : callback function
    *
    * @returns an array of stops
    */
    findStop: function(opts, cb) {
        if (opts.name) {
            var reqString = config.baseURL + '/querystation.asp?inpPointfr=' + encodeURIComponent(opts.name);

            request(reqString, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    if (config.returnXML) {
                        /* istanbul ignore next */
                        return cb(body, null);
                    } else {
                        xmlParser.parseString(body, function (err, result) {
                            if (!err && result) {
                                return cb(result['soap:Envelope']['soap:Body'][0]['GetStartEndPointResponse'][0]['GetStartEndPointResult'][0]['StartPoints'][0]['Point'], null);
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
            return cb(null, 'Parameter name must be specified.');
        }
    }
}
