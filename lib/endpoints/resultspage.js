var request = require('request');
var xmlParser = require('xml2js');
var config = require('../config');

module.exports = {
    /*
    * Finds all journeys between two points.
    *
    * @param next string : next/previous set of journeys
    * @param selPointFr obj : object containing info of departure point name|id|type
    * @param selPointTo obj : object containing info of arrival point name|id|type
    * @param limit int : number of journeys (optional)
    * @param date yymmdd : date of journeys yymmdd (optional)
    * @param time hhmm : date of journeys hhmm (optional)
    * @param transportMode int : sum of trafficmeans IDs (optional)
    * @param cb function : callback function
    *
    * @returns an array of journyes
    */
    getJourneys: function(opts, cb) {
        if (opts.from && opts.to && opts.action) {
            // validate opts.from
            if (!opts.from.name || !opts.from.id || (opts.from.type != 0 && opts.from.type != 1)) {
                return cb(null, 'Invalid opts.from object. Should have properties name, id and type.');
            }

            // validate opts.to
            if (!opts.to.name || !opts.to.id || (opts.to.type != 0 && opts.to.type != 1)) {
                return cb(null, 'Invalid opts.to object. Should have properties name, id and type.');
            }

            // validate opts.action
            if (opts.action != 'search' && opts.action != 'next' && opts.action != 'previous') {
                return cb(null, 'Invalid opts.action. Valid values are one of search, next or previous.');
            }

            var reqString = config.baseURL + '/resultspage.asp?cmdaction=' + encodeURIComponent(opts.action);
            reqString += '&selPointFr=' + encodeURIComponent(opts.from.name + '|' + opts.from.id + '|' + opts.from.type);
            reqString += '&selPointTo=' + encodeURIComponent(opts.to.name + '|' + opts.to.id + '|' + opts.to.type);

            // optional parameters
            if ((opts.date && !opts.time) || (!opts.date && opts.time) ) {
                return cb(null, 'Parameters date and time must both be present.');
            }

            if (opts.time && opts.date) {
                reqString += '&inpTime=' + encodeURIComponent(opts.inpTime) + '&inpDate=' + encodeURIComponent(opts.date);
            }

            if (opts.limit) {
                reqString += '&NoOf=' + encodeURIComponent(opts.limit);
            }

            if (opts.transportMode) {
                reqString += '&transportMode=' + encodeURIComponent(opts.transportMode);
            }

            request(reqString, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    if (config.returnXML) {
                        /* istanbul ignore next */
                        return cb(body, null);
                    } else {
                        xmlParser.parseString(body, function (err, result) {
                            if (!err && result) {
                                return cb(result['soap:Envelope']['soap:Body'][0]['GetJourneyResponse'][0]['GetJourneyResult'][0]['Journeys'][0]['Journey'], null);
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
            return cb(null, 'Invalid opts object. Should have objects from and to and action.');
        }
    }
}
