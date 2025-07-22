const express = require('express');
const isAuth = require('../middlewares/isAuth');
const { postJob, getAllJobs, getJobById, getAdminJobs } = require('../controllers/jobController');
const jobRouter = express.Router();  // Initialize the router


jobRouter.post("/register", isAuth, postJob);
jobRouter.get("/alljob", isAuth, getAllJobs);
jobRouter.get("/alljob/:id", isAuth, getJobById);
jobRouter.get("/adminjobs", isAuth, getAdminJobs);  // Ensure correct route

module.exports = jobRouter;