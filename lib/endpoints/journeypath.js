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
                        /* istanbul ignore next */
                        return cb(body, null);
                    } else {
                        xmlParser.parseString(body, function (err, result) {
                            if (!err && result) {
                                return cb(result['soap:Envelope']['soap:Body'][0]['GetJourneyPathResponse'][0]['GetJourneyPathResult'], null);
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
            return cb(null, 'Parameters journeyKey and sequenceNo must be specified.');
        }
    }
}
