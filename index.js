var nodeSkanetraiken = require('./lib/skanetrafiken');

nodeSkanetraiken.findStop('Kristianstad')
    .then(function(response) {
        // success
        console.log(response);
    }).catch(function(err) {
        // error
        console.log(err);
    });
