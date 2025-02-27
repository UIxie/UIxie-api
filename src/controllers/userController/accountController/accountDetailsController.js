const User = require("../../../models/users/user.model");
const jwt = require("jsonwebtoken");

class AccountDetailsController {
  async getProfile(req, res) {
    try {
      const authHeader = req.headers["authorization"];
      if (!authHeader) {
        return res
          .status(403)
          .json({ error: "No posee token de autenticación" });
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
        return res.status(403).json({ error: "Token no proporcionado" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.userId;

      if (!userId) {
        return res.status(400).json({ error: "ID de usuario no válido" });
      }

      const user = await User.findOne({
        where: { id: userId },
        attributes: {
          exclude: ["password"],
        },
      });

      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      return res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Hubo un error en el servidor" });
    }
  }
}

module.exports = new AccountDetailsController();
