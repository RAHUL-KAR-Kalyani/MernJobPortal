const express = require('express');

const { applyJob, getAppliedJobs, getApplicants, updateStatus } = require('../controllers/applicationController');
const applicationRouter = express.Router();


applicationRouter.get("/apply-job/:id", applyJob);
applicationRouter.get("/applied-jobs", getAppliedJobs);
applicationRouter.get("/:id/applicants", getApplicants);
applicationRouter.post("/update-status/:id/update", updateStatus);

module.exports = applicationRouter;