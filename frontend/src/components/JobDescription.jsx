import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';

const JobDescription = () => {

	// to change document title
	useEffect(() => {
		document.title = "Job Description";
	}, []);


	const params = useParams()
	const jobID = params.id;
	const { singleJob } = useSelector(store => store.job)
	const { user } = useSelector(store => store.auth);
	const isApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
	// const isApplied = singleJob?.applications?.some(applications => applications.applicant === user?._id) || false;	// work correctly
	{/* change apply now button after apply 👇 */ }
	const [isApply, setIsApply] = useState(isApplied);
	const dispatch = useDispatch()

	const salaryCal = singleJob?.salary;
	let formattedSalary;
	if (salaryCal < 100000) {
		formattedSalary = (salaryCal / 1000).toFixed(2) + ' TPA';
	} else if (salaryCal < 10000000) {
		formattedSalary = (salaryCal / 100000).toFixed(2) + ' LPA';
	} else {
		formattedSalary = (salaryCal / 10000000).toFixed(2) + ' CPA';
	}


	// apply job handler

	const applyJobHandler = async () => {
		try {
			const res = await axios.get(`${APPLICATION_API_ENDPOINT}/apply-job/${jobID}`, { withCredentials: true });
			console.log(res.data);
			if (res.data.success) {
				setIsApply(true);	//update isApply state
				const updateSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }		// to update total applicants
				dispatch(setSingleJob(updateSingleJob))		// immediate update total applicants after apply
				toast.success(res.data.message);
			}
		} catch (error) {
			toast.error(error.response.data.message)
		}
	}


	useEffect(() => {
		const fetchSingleJob = async () => {
			try {
				const res = await axios.get(`${JOB_API_ENDPOINT}/alljob/${jobID}`, { withCredentials: true });

				if (res.data.success) {
					dispatch(setSingleJob(res.data.job));
					setIsApply(res.data.job.applications.some(application => application.applicant === user?._id))		// ensure the state is in sync with fresh data. sometimes facing error for this line
				}
			} catch (error) {
				console.log(error)
			}
		}
		fetchSingleJob();
	}, [jobID, dispatch, user?._id]);


	// button css
	const buttonColor = isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]';
	const buttonText = isApplied ? 'Already Applied' : 'Apply Now';

	return (
		<div>
			<Navbar />
			<div className='max-w-7xl mx-auto my-10'>
				<div className='flex items-center justify-between'>
					<div>
						<h1 className='font-bold text-xl'>{singleJob?.title}</h1>
						<div className='flex items-center gap-2 mt-4'>
							<Badge className='text-blue-700 font-bold' variant='ghost'>{singleJob?.position} {singleJob?.position < 2 ? "Position" : "Positions"}</Badge>
							<Badge className='text-[#F83002] font-bold' variant='ghost'>{singleJob?.jobType}</Badge>
							<Badge className='text-[#7209b7] font-bold' variant='ghost'>{formattedSalary}</Badge>
						</div>
					</div>

					{/* apply now button 👇 */}

					<Button disabled={isApplied} className={`rounded-lg  ${buttonColor}`} onClick={isApplied ? null : applyJobHandler}>{buttonText}</Button>

				</div>
				<h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
				<div className='my-4'>
					<h1 className='font-bold my-1'>
						Role:
						<span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span>
					</h1>
					<h1 className='font-bold my-1'>
						Location:
						<span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span>
					</h1>
					<h1 className='font-bold my-1'>
						Description:
						<span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span>
					</h1>
					<h1 className='font-bold my-1'>
						Skills:
						<span className='pl-4 font-normal text-gray-800'>{singleJob?.requirements?.join(", ")}</span>
					</h1>
					<h1 className='font-bold my-1'>
						Experience:
						<span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLevel} Yrs</span>
					</h1>
					<h1 className='font-bold my-1'>
						Salary:
						<span className='pl-4 font-normal text-gray-800'>{singleJob?.salary} INR</span>
					</h1>
					<h1 className='font-bold my-1'>
						Total Applicants:
						<span className='pl-4 font-normal text-gray-800'>{singleJob?.applications.length}</span>
					</h1>
					<h1 className='font-bold my-1'>
						Posted Date:
						<span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span>
					</h1>
				</div>
			</div>
		</div>
	)
}

export default JobDescription