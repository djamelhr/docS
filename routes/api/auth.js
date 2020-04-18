const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const db = require("../../modules/db");

// @route    GET api/auth
// @desc     Get user by token
// @access   Private

router.get("/", auth, async (req, res) => {
  try {
    let user = await db("patient")
      .where({
        id: req.user.id,
      })
      .select(
        "username",
        "first",
        "last",
        "datebirth",
        "location",
        "email",
        "phone",
        "avatar",
        "added"
      );
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("email", "email is required").not().isEmpty(),
    check("password", "Password is required").exists(),
    check("password", "Password is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await db("patient").where({
        email,
      });
      console.log(user[0] == "undefined");
      if (!user[0]) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user[0].password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
        user: {
          id: user[0].id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
