var PrimeLockers = function() {
    var self = {};

    /** Functions to parse and respond to HTTP requests */
    self.handler = {
        get: function(req, res) {
            const lockerId = req.param.lockerId;
            self.get(lockerId).then(function(locker) {
                res.json(locker);
                res.sendStatus(200);
            }, function(statusCode) {
                statusCode = statusCode || 500;
                res.sendStatus(statusCode);
            });
        },
        getAll: function(req, res) {
            self.getAll().then(function(lockers) {
                res.json(lockers);
                res.sendStatus(200);
            }, function(statusCode) {
                statusCode = statusCode || 500;
                res.sendStatus(statusCode);
            });
        }
    }
    
    /**
     * Returns full locker row
     * @param {*} lockerId - ID of locker
     * @returns {Promise}
     */
    self.get = function(lockerId) {
        return new Promise(function(resolve, reject) {

        });
    }

    /**
     * Returns all lockers and their checked_out status
     * @returns {Promise}
     */
    self.getAll = function() {
        return new Promise(function(resolve, reject) {

        });
    }

    return self;
}

module.exports = PrimeLockers();