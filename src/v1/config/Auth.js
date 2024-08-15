const { expressjwt: jwt } = require("express-jwt");
// const { ExtractJwt } = require('passport-jwt');
const secret = process.env.JWT_SECRET;

const authenticate = jwt({
  secret: secret,
  algorithms: ["RS256", "HS256"],
  getToken: function fromHeaderOrQuerystring(req) {
    if (
      req.headers.access_token &&
      req.headers.access_token.split(" ")[0] === "Bearer"
    ) {
      return req.headers.access_token.split(" ")[1];
    }
    return null;
  },
});

const isAdmin = (req, res, next) => {
  // Assuming the decoded token is stored in req.user
  if (req.auth && req.auth.isAdmin) {
    // If user has admin privileges, proceed
    next();
  } else {
    // If not admin, return unauthorized error
    return res.status(403).json({ error: "Unauthorized, not an admin" });
  }
};

module.exports = {
  authenticate,
  isAdmin,
};
