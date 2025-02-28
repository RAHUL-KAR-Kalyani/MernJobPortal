const Job = require("../models/jobModel");


// create job by admin
// const postJob = async (req, res) => {
//     try {
//         const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
//         const userId = req.id;

//         if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
//             return res.status(400).json({
//                 message: 'Please ensure all required fields are provided.',
//                 success: false
//             });
//         }
//         const job = await Job.create({
//             title,
//             description,
//             requirements: requirements.split(","),
//             salary: Number(salary),
//             location,
//             jobType,
//             experienceLevel: experience,
//             position,
//             companyId: companyId,
//             created_by: userId

//         })
//         return res.status(201).json({
//             message: 'A new job has been successfully created.',
//             job,
//             success: true
//         });

//     } catch (error) {
//         console.log(error)
//     }
// }


const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        // Input validation
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            console.log(req.body);
            return res.status(400).json({
                message: 'Please ensure all required fields are provided.',
                success: false
            });
        }

        // Create the job entry
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(",").map(req => req.trim()),  // Clean up the requirements
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId  // This should store the user's ID who is creating the job
        });

        // Success response
        return res.status(201).json({
            message: 'A new job has been successfully created.',
            job,
            success: true
        });

    } catch (error) {
        console.error(error);  // Log the full error
        return res.status(500).json({
            message: 'An error occurred while creating the job.',
            success: false,
            error: error.message || error  // Send back the error message for debugging
        });
    }
}


// get jobs for user

const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        }

        const jobs = await Job.find(query).populate({ path: "company" }).sort({ createdAt: -1 });

        if (!jobs) {
            return res.status(404).json({
                message: 'The job you are looking for does not exist or has been removed.',
                success: false
            });
        }

        return res.status(200).json({
            jobs,
            success: true
        });

    } catch (error) {
        console.log(error)
    }
}


// getJobsByID for user

const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications"
        });
        if (!job) {
            return res.status(404).json({
                message: 'The requested job could not be found.',
                success: false
            });
        }
        return res.status(200).json({
            job,
            success: true
        });
    } catch (error) {
        console.log(error)
    }
}

// view all posted job by admin for admin

const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({ path: "company", createdAt: -1 });
        // const jobs = await Job.find({ created_by: adminId }).populate({ path: "company" }).sort({ createdAt: -1 });

        if (!jobs) {
            return res.status(404).json({
                message: "You have not posted any jobs yet.",
                success: false
            });
        }
        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.log(error)
    }
}


module.exports = { postJob, getAllJobs, getJobById, getAdminJobs };