const express = require('express');

const { applyJob, getAppliedJobs, getApplicants, updateStatus } = require('../controllers/applicationController');
const isAuth = require('../middlewares/isAuth');
const applicationRouter = express.Router();


applicationRouter.get("/apply-job/:id", isAuth, applyJob);
applicationRouter.get("/applied-jobs", isAuth, getAppliedJobs);
applicationRouter.get("/:id/applicants", isAuth, getApplicants);
applicationRouter.post("/update-status/:id/update", isAuth, updateStatus);

module.exports = applicationRouter;