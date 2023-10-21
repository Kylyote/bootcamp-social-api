// Creating user routes and controllers and wondering if I need a contollers folder.
const router = require("express").Router();
const { Post } = require("../../models");

// Add route for getting all Notions
router.get("/", async (req, res) => {
  try {
    const notionData = await Notion.find();
    res.json(notionData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Route for adding a new Notion
router.post("/", async (req, res) => {
  try {
  } catch (error) {}
});

// Route for updating a Notion by ID

// Route for deleting a Notion by ID

module.exports = router;
