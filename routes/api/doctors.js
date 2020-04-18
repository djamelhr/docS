const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const db = require("../../modules/db");
// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get("/", auth, async (req, res) => {
  db.select("*")
    .from("doctor")
    .then((items) => {
      if (items.length) {
        res.json(items);
      } else {
        res.json({ dataExists: "false" });
      }
    })
    .catch((err) => res.status(400).json({ dbError: "db error" }));
});
router.get("/:location", auth, async (req, res) => {
  await db
    .select("*")
    .from("doctor")
    .where("location", req.params.location)

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
