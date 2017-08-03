var request = require('request');
var xmlParser = require('xml2js');
var config = require('../config');

module.exports = {

    /*
    * Finds current traffic means.
    * 
    * @returns an array of traffic means
    */
    getTrafficMeans: function(cb) {
        var reqString = config.baseURL + '/trafficmeans.asp';

        request(reqString, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                if (config.returnXML) {
                    return cb(body, null)
                } else {
                    xmlParser.parseString(body, function (err, result) {
                        if (!err && result) {
                            return cb(result['soap:Envelope']['soap:Body'][0]['GetMeansOfTransportResponse'][0]['GetMeansOfTransportResult'][0]['TransportModes'], null);
                        } else {
                            return cb(null, error);
                        }
                    });
                }

            } else {
                return cb(null, error);
            }
        });
    }
}
