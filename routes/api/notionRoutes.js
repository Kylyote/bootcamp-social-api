const router = require("express").Router();
const notionController = require("../../controllers/notionController");

// Route for adding a new Notion
router.post("/", notionController.addNotion);

// Route for updating a Notion by ID
router.put("/:id", notionController.updateNotion);

// Route for deleting a Notion by ID
router.delete("/:id", notionController.deleteNotion);

module.exports = router;
