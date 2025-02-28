const express = require('express');
const { registerController, loginController, updateController, logoutController } = require('../controllers/userController');
const isAuth = require('../middlewares/isAuth');
const { singleUpload } = require('../middlewares/multer');
const userRouter = express.Router();  // Initialize the router

// Define routes
userRouter.post("/register-user", singleUpload, registerController);
userRouter.post("/login-user", loginController);
userRouter.post("/logout", logoutController);
userRouter.post("/profile/update-user", isAuth, singleUpload, updateController);  // Ensure correct route

// Export the router
module.exports = userRouter;
