var request = require('request');
var xmlParser = require('xml2js');
var config = require('../config');

module.exports = {
    /*
    * Finds all departures from a specified stop
    *
    * @param stopID int : id of the stop
    * @param date date : date for departure yymmdd (optional)
    * @param time time : time for departure hhmm (optional)
    * @param arrivals bool : true if arrivals are wanted (optional)
    * @param cb function : callback function
    *
    * @returns an array of departures from the specified stop
    */
    getDepartures: function(opts, cb) {
        if (opts.stopID) {
            var reqString = config.baseURL + '/stationresults.asp?selPointFrKey=' + encodeURIComponent(opts.stopID);

            if ((opts.date && !opts.time) || (!opts.date && opts.time) ) {
                return cb(null, 'Parameters date and time must both be present.');
            }

            if (opts.date && opts.time) {
                reqString += '&inpDate=' + encodeURIComponent(opts.date) + '&inpTime=' + encodeURIComponent(opts.time);
            }

            if (opts.arrivals) {
                reqString += '&selDirection=1';
            }

            request(reqString, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    if (config.returnXML) {
                        /* istanbul ignore next */
                        return cb(body, null);
                    } else {
                        xmlParser.parseString(body, function (err, result) {
                            if (!err && result) {
                                return cb(result['soap:Envelope']['soap:Body'][0]['GetDepartureArrivalResponse'][0]['GetDepartureArrivalResult'][0]['Lines'][0].Line, null);
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
            return cb(null, 'Parameter stopID must be specified.');
        }
    }
}
