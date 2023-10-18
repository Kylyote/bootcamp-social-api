// Creating user routes and controllers and wondering if I need a contollers folder.
const router = require("express").Router();
//const notionController = require("../../controllers/notionController");

// Add route for getting all Notions
router.get("/", async (req, res) => {
  try {
    const notionData = await Notion.find({});
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
router.put("/:id", notionController.updateNotion);

// Route for deleting a Notion by ID
router.delete("/:id", notionController.deleteNotion);

module.exports = router;
