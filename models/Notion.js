// break out Schema and model into separate files
const { Schema, model } = require("mongoose");
const { format } = require("date-fns");

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
      type: [],
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// create a virtual reactionCount that retrieves the length of the thought's reactions array field
notionSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Notion = model("Notion", notionSchema);

module.exports = Notion;
