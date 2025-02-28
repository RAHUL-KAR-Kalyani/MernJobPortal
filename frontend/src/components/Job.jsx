import React, { useState } from 'react'
import { Button } from './ui/button'
import { Bookmark, BookmarkCheckIcon } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
	const navigate = useNavigate();
	const [isBookmarked, setIsBookmarked] = useState(false);	// to toggle bookmark icon on click

	// salary calculation
	const salaryCal = job?.salary;
	let formattedSalary;

	if (salaryCal < 100000) {
		formattedSalary = (salaryCal / 1000).toFixed(2) + ' TPA';
	} else if (salaryCal < 10000000) {
		formattedSalary = (salaryCal / 100000).toFixed(2) + ' LPA';
	} else {
		formattedSalary = (salaryCal / 10000000).toFixed(2) + ' CPA';
	}

	const daysAgoFunction = (mongodbTime) => {
		const createdAt = new Date(mongodbTime);
		const currentTime = new Date();
		const timeDifference = currentTime - createdAt;
		return Math.floor(timeDifference / (1000 * 60 * 60 * 24))

		// milisecond*60(for each sec)*60(for each min)*24(for a day)
	}


	return (
		<div className='p-5 rounded-md shadow-xl bg-white border border-gray-200'>
			<div className='flex items-center justify-between'>
				<p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : daysAgoFunction(job?.createdAt) === 1 ? "Yesterday" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
				{/* <Button variant="outline" className="rounded-full" size="icon"><Bookmark /><BookmarkCheckIcon /></Button> */}
				<Button variant="outline" className="rounded-full" size="icon" onClick={() => setIsBookmarked(!isBookmarked)}>
					{isBookmarked ? <BookmarkCheckIcon /> : <Bookmark />}
				</Button>
			</div>

			<div className='flex items-center gap-2 my-2'>
				<Button className="p-6" variant="outline" size="icon">
					<Avatar>
						<AvatarImage src={job?.company?.logo} />
					</Avatar>
				</Button>
				<div>
					<h1 className='font-medium text-lg'>{job?.company?.name}</h1>
					<p className='text-sm text-gray-600'>{job?.location}</p>
				</div>
			</div>
			<div className=''>
				<h1 className='font-bold text-lg my-2'>{job?.title}</h1>
				<p className='text-sm text-gray-600'>{job?.description}</p>
			</div>
			<div className='flex items-center gap-2 mt-4'>
				<Badge className='text-blue-700 font-bold' variant='ghost'>{job?.position} {job?.position < 2 ? "Position" : "Positions"}</Badge>
				<Badge className='text-[#F83002] font-bold' variant='ghost'>{job?.jobType}</Badge>
				<Badge className='text-[#7209b7] font-bold' variant='ghost'>{formattedSalary}</Badge>
			</div>
			<div className='flex items-center gap-4 mt-4'>
				<Button variant="outline" onClick={() => navigate(`/job/description/${job?._id}`)}>Details</Button>
				<Button className="bg-[#7209b7]">Save For Later</Button>
			</div>
		</div>
	)
}

export default Job