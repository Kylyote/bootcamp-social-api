// Creating the User model
// This line of code breaks out the Schema and model properties from the mongoose object.
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    notion: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Notion",
    },
    friends: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// This creates a virtual that gets the length of the user's friends array.
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", userSchema);

module.exports = User;
