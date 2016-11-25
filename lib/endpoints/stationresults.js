var request = require('request');
var xmlParser = require('xml2js');
var config = require('../config');
    
module.exports = {
    /*
    * Finds all departures from a specified stop
    *
    * @param stopID int : id of the stop
    * @param inpDate date :	date for departure yymmdd (optional)
    * @param inpTime time :	time for departure hhmm (optional)
    * @param selDirection int :	direction - 0 for departures, 1 for arrivals (optional)
    * @param cb function : callback function
    *
    * @returns an array of departures from the specified stop
    */
    getDepartures: function(opts, cb) {
        if (opts.stopID) {
            var reqString = config.baseURL + '/stationresults.asp?selPointFrKey=' + encodeURIComponent(opts.stopID);

            if (opts.date && opts.time) {
                reqString += '&inpDate=' + encodeURIComponent(opts.date) + '&inpTime=' + encodeURIComponent(opts.time);
            }

            request(reqString, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    if (config.returnXML) {
                        return cb(body, null);
                    } else {
                        xmlParser.parseString(body, function (err, result) {
                            if (!err && result) {
                                return cb(result['soap:Envelope']['soap:Body'][0]['GetDepartureArrivalResponse'][0]['GetDepartureArrivalResult'][0]['Lines'][0].Line, null);
                            } else {
                                return cb(null, err);
                            }
                        });
                    }

                } else {
                    return cb(null, error);
                }
            });
        } else {
            return cb(null, 'Parameter stopID must be specified.');
        }
    }
}