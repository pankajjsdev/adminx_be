const basicAuth = require('basic-auth');
var logger = require('./logger');

const authenticate = (req, res, next) => {
    const credentials = basicAuth(req);
    if (!credentials || !checkCredentials(credentials.name, credentials.pass)) {
        res.set('WWW-Authenticate', 'Basic realm="example"');
        logger.error(`Authentication required. Method: ${req.method}, URL: ${req.originalUrl}, IP: ${req.ip}`);
        return res.status(401).send('Authentication required.');
    }

    next();
};

// Dummy function to check credentials, replace with your actual implementation
const checkCredentials = (username, password) => {
    return username === process.env.auth_username && password === process.env.auth_password;
};

module.exports = authenticate
