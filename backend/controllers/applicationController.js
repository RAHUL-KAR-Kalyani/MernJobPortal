const Application = require("../models/applicationModel");
const Job = require("../models/jobModel");


// applyJob
const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        // const { id: jobId } = req.params;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required",
                success: false
            })
        }
        // check if already applied
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });

        if (existingApplication) {
            return res.status(400).json({
                message: "Already Applied for this job",
                success: false
            })
        }

        // check if job exist
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "job not found",
                success: false
            })
        }

        // create new application
        const newApplication = await Application.create({ job: jobId, applicant: userId })

        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            message: "job applied successfully",
            success: true
        })


    } catch (error) {
        console.log(error)
    }
}


// all appliedJobs
const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: 'job',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'company',
                options: { sort: { createdAt: -1 } }
            }
        })

        if (!application) {
            return res.status(404).json({
                message: "no applications",
                success: false
            })
        }

        return res.status(200).json({
            application,
            success: true
        })

    } catch (error) {
        console.log(error)
    }
}


// how many user applied
const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant'
            }
        });
        if (!job) {
            return res.status(404).json({
                message: "job not found",
                success: false
            })
        }
        return res.status(200).json({
            job,
            success: true
        })

    } catch (error) {
        console.log(error)
    }
}

// updateJob applyStatus
const updateStatus = async (req, res) => {
    try {
        const {status}=req.body;
        const applicationId=req.params.id;
        if(!status){
            return res.status(400).json({
                message: "status is required",
                success: false
            })
        }

        // find the application by applicantID

        const application=await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(404).json({
                message: "application not found",
                success: false
            })
        }
        //update status
        application.status=status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "Application status updated successfully.",
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}



module.exports = { applyJob, getAppliedJobs, getApplicants, updateStatus }