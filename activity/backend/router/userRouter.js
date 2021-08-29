const express = require("express");
const { getAllUsers, createUser, deleteUserById, getUserById, updateUserById } = require("../controller/userController");
const userRouter = express.Router();


userRouter.route("/").get(getAllUsers).post(createUser)
userRouter.route("/:id").get(getUserById).delete(deleteUserById).patch(updateUserById)


module.exports = userRouter;

//localhost:3000/api/users/
//localhost:3000/api/user/:uid