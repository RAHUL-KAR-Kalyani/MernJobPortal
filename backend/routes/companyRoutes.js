const express = require('express');
const { registerCompany, getCompany, getCompanyById, updateCompany } = require('../controllers/companyController');
const { singleUpload } = require('../middlewares/multer');
const isAuth = require('../middlewares/isAuth');
const companyRouter = express.Router();  // Initialize the router

// Define routes
companyRouter.post("/registercompany", isAuth, registerCompany);
companyRouter.get("/Company", isAuth, getCompany);
companyRouter.get("/Company/:id", isAuth, getCompanyById);
companyRouter.put("/updatecompany/:id", isAuth, singleUpload, updateCompany);  // Ensure correct route

// Export the router
module.exports = companyRouter;
