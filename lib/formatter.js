var config = require('./config');

module.exports = {
    format: function(data) {
        if (config.returnJSON) {
            return data;
        } else {
            return data;
        }
    }
};
