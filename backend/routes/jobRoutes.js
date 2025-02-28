const express = require('express');
const { postJob, getAllJobs, getJobById, getAdminJobs } = require('../controllers/jobController');
const jobRouter = express.Router();  // Initialize the router


jobRouter.post("/register", postJob);
jobRouter.get("/alljob", getAllJobs);
jobRouter.get("/alljob/:id", getJobById);
jobRouter.get("/adminjobs", getAdminJobs);  // Ensure correct route

module.exports=jobRouter;