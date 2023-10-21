// Create routes and controllers for User
// import router
const router = require("express").Router();
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
    const userData = await User.find({});
    res.json(userData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Create a new user
router("/").post(createNewUser);

// Get a single user data by _id then you can update and delete based on HTML request method
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// Add a friend or remove a friend from the user's friend list
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;
