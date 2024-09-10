const router = require("express").Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/usercontroller");

// Matches with "/users/:userId"
router.route("/").get(getUsers).post(createUser);

// Matches with "/users/:userId/friends/:friendId"
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
