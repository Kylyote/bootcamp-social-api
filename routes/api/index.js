const router = require("express").Router();
const notionRoutes = require("./notionRoutes");
const userRoutes = require("./userRoutes");

router.use("/notions", notionRoutes);
router.use("/users", userRoutes);

module.exports = router;
