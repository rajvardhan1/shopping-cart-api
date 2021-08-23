const outerRoute = require('./outerRoute');

class CustomRoute {
    constructor(app) {
        app.use('/', outerRoute)
    }
}

module.exports = CustomRoute;