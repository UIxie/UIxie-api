const User = require("../../../models/users/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthUserController {
  async createUser(req, res) {
    try {
      const { first_name, last_name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        first_name,
        last_name,
        email,
        password: hashedPassword,
      });

      res.json(user);
    } catch (error) {
      res.json({ message: error });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res
          .status(400)
          .json({ message: "Correo o contraseña incorrectos" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Correo o contraseña incorrectos" });
      }

      const payload = {
        userId: user.id,
        email: user.email,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "356d",
      });

      return res.json({ token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Hubo un error en el servidor" });
    }
  }
}

module.exports = new AuthUserController();
