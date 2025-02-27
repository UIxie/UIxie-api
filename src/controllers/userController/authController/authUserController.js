const User = require("../../../models/users/user.model");
const bcrypt = require("bcrypt");

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
}

module.exports = new AuthUserController();
