// Create routes and controllers for User
// import router
const router = require("express").Router();
const { User } = require("../../models");
const {
  getSingleUser,
  createNewUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userContoller");

// Get all User data
router.get("/", async (req, res) => {
  try {
    const userData = await User.find();
    res.status(200).json(userData);
    console.log("User call went through.");
  } catch (error) {
    console.log("There was an error" + error);
    res.status(500).json(error);
  }
});

// Create a new user
router.route("/").post(createNewUser);

// Get a single user data by _id then you can update and delete based on HTML request method
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// Add a friend or remove a friend from the user's friend list
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;
