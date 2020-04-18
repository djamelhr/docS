const express = require("express");
const router = express.Router();
const db = require("../../modules/db");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const normalize = require("normalize-url");

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let {
      username,
      password,
      first,
      last,
      datebirth,
      location,
      email,
      phone,
      gender,
    } = req.body;
    try {
      let user = await db("patient").where({
        email: email,
      });
      console.log(user);
      //   if (user) {
      //     return res
      //       .status(400)
      //       .json({ errors: [{ msg: "User already exists" }] });
      //   } else {
      const avatar = normalize(
        gravatar.url(email, {
          s: "200",
          r: "pg",
          d: "mm",
        }),
        { forceHttps: true }
      );
      const salt = await bcrypt.genSalt(10);

      password = await bcrypt.hash(password, salt);
      console.log(password);
      await db("patient")
        .insert({
          username,
          password,
          first,
          last,
          datebirth,
          location,
          email,
          phone,
          avatar,
          gender,
        })
        .returning("*")
        .then((item) => {
          const payload = {
            user: {
              id: item[0].id,
            },
          };
          console.log(payload);
          jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 360000 },
            (err, token) => {
              if (err) throw err;
              res.json({ token });
            }
          );
        })
        .catch((err) => res.status(400).json({ dbError: err }));
    } catch (error) {
      console.log(error);
    }
    //const added = new Date()
  }
);

//get all users
router.get("/", (req, res) => {
  db.select("*")
    .from("patient")
    .then((items) => {
      if (items.length) {
        res.json(items);
      } else {
        res.json({ dataExists: "false" });
      }
    })
    .catch((err) => res.status(400).json({ dbError: "db error" }));
});
module.exports = router;
