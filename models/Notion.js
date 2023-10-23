// break out Schema and model into separate files
const { Schema, model } = require("mongoose");
const { format } = require("date-fns");
const User = require("./User");
const reactionSchema = require("./Reaction");

const notionSchema = new Schema(
  {
    notionText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: function (date) {
        return format(date, "MM-dd-yyyy HH:mm:ss");
      },
    },
    userName: {
      type: String,
      required: true,
    },
    reactions: {
      type: [reactionSchema],
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
// Instantiate Notion model so shit can be added to it
const Notion = model("Notion", notionSchema);

// Using the MongoDB feature of writing custom methods into model instances
// Get one notion based on notion _id
Notion.getOneNotion = async function (req, res) {
  try {
    const notion = await Notion.findOne({ _id: req.params.notionId });

    if (!notion) {
      return res.status(404).json({ message: "No notion with this id." });
    }

    res.status(200).json(notion);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Create a new notion
Notion.createNotion = async function (req, res) {
  try {
    const newNotion = await Notion.create(req.body);
    const userNotion = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $push: { notion: newNotion._id } },
      { new: true, runValidators: true }
    );
    res.status(200).json(newNotion);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update a notion based on notion _id
Notion.updateNotion = async function (req, res) {
  try {
    const updateData = await Notion.findOneAndUpdate(
      { _id: req.params.notionId },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!updateData) {
      return res.status(404).json({ message: "No notion with this id." });
    }

    res.json(updateData);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete a notion based on notion _id
Notion.deleteNotion = async function (req, res) {
  try {
    const deleteNotion = await Notion.findOneAndDelete({
      _id: req.params.notionId,
    });

    if (!deleteNotion) {
      return res.status(404).json({ message: "No notion with this id." });
    }

    res.json({ message: "Notion deleted." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Notion was not deleted." });
  }
};
// Add a reaction to a notion
Notion.addReaction = async function (req, res) {
  try {
    const reactionData = await Notion.findOneAndUpdate(
      { _id: req.params.notionId },
      { $addToSet: { reactions: req.body } },
      { new: true, runValidators: true }
    );

    if (!reactionData) {
      return res.status(404).json({ message: "No notion with this id." });
    }

    res.json(reactionData);
  } catch (err) {
    return res.status(500).json({ message: "No notion found with this id." });
  }
};
// Delete a reaction from a notion
Notion.deleteReaction = async function (req, res) {
  try {
    const deleteReaction = await Notion.findOneAndUpdate(
      { _id: req.params.notionId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } }
    );
  } catch (err) {
    console.log("Error: Reaction was not deleted.");
    res.status(500).json(err);
  }
};

// create a virtual reactionCount that retrieves the length of the thought's reactions array field
notionSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

module.exports = Notion;
