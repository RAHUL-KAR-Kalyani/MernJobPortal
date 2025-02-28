import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';

const LatestJobCards = ({ job }) => {
	const height="30px"
	const width="100px"
	const navigate = useNavigate();
	// salary calculation
	const salaryCal = job?.salary;
	let formattedSalary;
	if (salaryCal < 100000) {
		formattedSalary = (salaryCal / 1000).toFixed(2) + ' Thousand Per Year';
	} else if (salaryCal < 10000000) {
		formattedSalary = (salaryCal / 100000).toFixed(2) + ' LPA';
	} else {
		formattedSalary = (salaryCal / 10000000).toFixed(2) + ' CPA';
	}
	return (
		<div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer' onClick={() => navigate(`/job/description/${job._id}`)} >

				<Avatar>     
					<AvatarImage src={job.company.logo} style={{height:"90px",width:"auto"}}/>
					{/* <p>Lorem, ipsum dolor.</p> */}
				</Avatar>

			<div>
				<h1 className='font-medium text-lg'>{job?.company?.name}</h1>
				<p className='text-sm text-gray-500'>{job?.location}</p>
			</div>
			<div>
				<h1 className='font-bold text-lg my-2'>{job?.title}</h1>
				<p className='text-sm text-gray-600'>{job?.description}</p>
			</div>
			<div className='flex items-center gap-2 mt-4'>
				<Badge className='text-blue-700 font-bold' variant='ghost'>{job?.position} {job?.position < 2 ? "Position" : "Positions"}</Badge>
				<Badge className='text-[#F83002] font-bold' variant='ghost'>{job?.jobType}</Badge>
				<Badge className='text-[#7209b7] font-bold' variant='ghost'>{formattedSalary}</Badge>
			</div>
		</div>
	)
}

export default LatestJobCards