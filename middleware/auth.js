const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, config.get("JWT_SECRET"));
    req.user = decoded;
    return next();
  } catch (ex) {
    return res.status(400).send("Invalid token.");
  }
}

module.exports = auth;
