const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(403).json({ error: "No posee token de autenticación" });
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    return res.status(403).json({ error: "No posee token de autenticación" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ error: "Error en la autenticación del token" });
    }
    req.userId = decoded.userId;
    next();
  });
}

module.exports = verifyToken;
