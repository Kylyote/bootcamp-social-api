// Create routes and controllers for User
// import router
const router = require("express").Router();

// Get all User data
router.get("/", async (req, res) => {
  try {
    const userData = await User.find({});
    res.json(userData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get a single user data by _id
router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findOne({ _id: req.params.id });
    res.json(userData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
