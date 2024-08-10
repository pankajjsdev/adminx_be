const basicAuth = require('basic-auth');

const authenticate = (req, res, next) => {
    const credentials = basicAuth(req);
    if (!credentials || !checkCredentials(credentials.name, credentials.pass)) {
        res.set('WWW-Authenticate', 'Basic realm="example"');
        return res.status(401).send('Authentication required.');
    }

    next();
};

// Dummy function to check credentials, replace with your actual implementation
const checkCredentials = (username, password) => {
    return username === process.env.auth_username && password === process.env.auth_password;
};

module.exports = authenticate
