// Creating user routes and controllers and wondering if I need a contollers folder.
const router = require("express").Router();
// Pull in the Notion model to use the methods that have been created there.
const { Notion } = require("../../models");

// Add route for getting all Notions
router.get("/", async (req, res) => {
  try {
    const notionData = await Notion.find();
    console.log("Notion call went through.");
    res.status(200).json(notionData);
  } catch (error) {
    console.log("There was a notion error" + error);
    res.status(500).json(error);
  }
});

// Route for adding a new Notion. The methods have been written into the Notion model.
router.route("/:userId").post(Notion.createNotion);
router
  .route("/:notionId")
  .get(Notion.getOneNotion)
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
