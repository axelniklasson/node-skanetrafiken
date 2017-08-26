var request = require('request');
var xmlParser = require('xml2js');
var config = require('../config');

module.exports = {
    /*
    * Returns coordinates for journeypath on a map.
    *
    * @param cf string :  JourneyKey retrieved in response from resultspage method
    * param id string : SequenceNo of journey retrieved in response from resultspage method
    * @param cb function : callback function
    *
    * @returns SOMETHING COOL
    */
    getJourneyPath: function(opts, cb) {
        if (opts.journeyKey && opts.sequenceNo) {
            var reqString = config.baseURL + '/journeypath.asp?cf=' + encodeURIComponent(opts.journeyKey) + '&id=' + encodeURIComponent(opts.sequenceNo);

            request(reqString, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    if (config.returnXML) {
                        return cb(body, null);
                    } else {
                        xmlParser.parseString(body, function (err, result) {
                            if (!err && result) {
                                console.log(result['soap:Envelope']['soap:Body'][0]['GetJourneyPathResponse'][0]['GetJourneyPathResult']);
                                // return cb(result['soap:Envelope']['soap:Body'][0]['GetStartEndPointResponse'][0]['GetStartEndPointResult'][0]['StartPoints'][0]['Point'], null);
                            } else {
                                return cb(null, error);
                            }
                        });
                    }
                } else {
                    return cb(null, error);
                }
            });
        } else {
            return cb(null, 'Parameters journeyKey and sequenceNo must be specified.');
        }
    }
}
