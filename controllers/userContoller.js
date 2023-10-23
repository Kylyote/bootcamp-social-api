// This is written like the activity examples. The Notion posted controller functions are actually in models/Notion.js and are added as methods in the notionSchema.
const User = require("../models/User");
const { Notion } = require("../models");

module.exports = {
  async getSingleUser(req, res) {
    try {
      const userData = await User.findOne({ _id: req.params.userId });

      if (!userData) {
        return res
          .status(404)
          .json({ message: "There is no user with this id." });
      }
      res.status(200).json(userData);
    } catch (err) {
      console.log("There was an error");
      res.status(500).json(err);
    }
  },
  async createNewUser(req, res) {
    try {
      const newUserData = await User.create(req.body);
      res.json(newUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateUser(req, res) {
    try {
      const updateData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!updateData) {
        return res.status(404).json({ message: "No user with this id." });
      }

      res.json(updateData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    try {
      const deleteData = await User.findOneAndDelete({
        _id: req.params.userId,
      });
      console.log(deleteData);

      // When the user is deleted, have a method that calls the deleteMany() method in the Notion model to remove all the user's notions from the database.
      await Notion.deleteMany({ userName: deleteData.userName });

      if (!deleteData) {
        return res.status(404).json({ message: "No user with this id." });
      }

      res.json({ message: "User and their notions deleted." });
    } catch (err) {
      console.log("The user was not deleted.");
      res.status(500).json(err);
    }
  },
  // add a friend to a user's friend list
  async addFriend(req, res) {
    try {
      const addFriendData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true, runValidators: true }
      );

      if (!addFriendData) {
        return res.status(404).json({ message: "No user with this id." });
      }

      console.log("You have added a friend.");
      res.status(200).json(addFriendData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // remove a friend from a user's list
  async deleteFriend(req, res) {
    try {
      const deleteFriendData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true, runValidators: true }
      );

      if (!deleteFriendData) {
        return res.status(404).json({ message: "No user with this id." });
      }

      console.log("Friend removed succcessfully.");
      res.status(200).json(deleteFriendData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
