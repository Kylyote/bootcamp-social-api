// Creating user routes and controllers and wondering if I need a contollers folder.
const router = require("express").Router();
// Pull in the Notion model to use the methods that have been created there.
const { Notion } = require("../../models");

// Add route for getting all Notions
router.get("/", async (req, res) => {
  try {
    const notionData = await Notion.find();
    res.json(notionData);
    console.log("Notion call went through.");
  } catch (error) {
    console.log("There was a notion error");
    res.status(500).json(error);
  }
});

// Route for adding a new Notion. The methods have been written into the Notion model.
router
  .route("/:notionId")
  .get(Notion.getOneNotion)
  .post(Notion.createNotion)
  .put(Notion.updateNotion)
  .delete(Notion.deleteNotion);

router.get("/", async (req, res) => {
  const notion = new Notion();
  await notion.getOneNotion(req, res);
});

// Route for adding a reaction.
router.route("/:notionId/reactions/").post(Notion.addReaction);

// Route for deleting a reaction.
router
  .route("/:notionId/reactions/:reactionId")
  .post(Notion.addReaction)
  .delete(Notion.deleteReaction);

module.exports = router;
