var request = require('request');
var fm = require('./formatter');
var config = require('./config');

/*
* Module containing all wrapper methods related to stops.
*/
module.exports = {
    /*
    * Finds all stops matching name.
    *
    * @param name string : string matching desired stop
    */
    findStop: function(name) {
        if (name) {
            var promise = new Promise(
                function(resolve, reject) {
                    var reqString = config.baseURL + '/querystation.asp?inpPointfr=' + encodeURIComponent(name);

                    request(reqString, function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            resolve(fm.format(body));
                        } else {
                            reject(error);
                        }
                    });
                }
            );

            return promise;
        }
    },

    /*
    * Finds all department and arrival stops matching from and to.
    *
    * @param from string : string matching department stop
    * @param to string : string matching arrival stop
    */
    findStartAndStop: function(from, to) {
        if (from && to) {
            var promise = new Promise(
                function(resolve, reject) {
                    var reqString = config.baseURL + '/querypage.asp?inpPointfr=' + encodeURIComponent(from)
                    + '&inpPointTo=' + encodeURIComponent(to);

                    request(reqString, function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            resolve(fm.format(body));
                        } else {
                            reject(error);
                        }
                    });
                }
            );

            return promise;
        }
    }
};
