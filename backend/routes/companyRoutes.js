const express = require('express');
const { registerCompany, getCompany, getCompanyById, updateCompany } = require('../controllers/companyController');
const { singleUpload } = require('../middlewares/multer');
const companyRouter = express.Router();  // Initialize the router

// Define routes
companyRouter.post("/registercompany", registerCompany);
companyRouter.get("/Company", getCompany);
companyRouter.get("/Company/:id", getCompanyById);
companyRouter.put("/updatecompany/:id",singleUpload, updateCompany);  // Ensure correct route

// Export the router
module.exports = companyRouter;
