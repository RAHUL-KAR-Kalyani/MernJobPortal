import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {
	// const { companies, searchByJobByText } = useSelector(store => store.company);
	const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
	const navigate = useNavigate()
	// creating state for filter job name
	const [filterJobs, setFilterJobs] = useState(allAdminJobs);

	// filter job logic

	useEffect(() => {
		const filteredJobs = allAdminJobs.filter((job) => {
			if (!searchJobByText) {
				return true;
			};
			return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
			// filter with job title and company name

		});
		setFilterJobs(filteredJobs);	// must be filteredJobs, not filterJobs
	}, [allAdminJobs, searchJobByText]);	// if anyone of this changed then useEffect will call

	return (
		<div>
			<Table>
				<TableCaption>A list of your recent posted Jobs. </TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Company Name</TableHead>
						<TableHead>Job Role</TableHead>
						<TableHead>Date</TableHead>
						<TableHead className='text-right'>Action</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{
						filterJobs?.map((job) => (
							<TableRow key={job._id}>
								<TableCell className='flex items-center capitalize text-base'>
									<Avatar>
										<AvatarImage src={job?.company?.logo} />
									</Avatar>
									<TableCell className='capitalize'>{job?.company?.name}</TableCell>
								</TableCell>
								<TableCell className='capitalize'>{job?.title}</TableCell>
								<TableCell>{job?.createdAt.split("T")[0]}</TableCell>
								<TableCell className='text-right cursor-pointer items-center'>
									<Popover>
										<PopoverTrigger><MoreHorizontal /></PopoverTrigger>
										<PopoverContent className='w-32'>
											{/* <div onClick={() => navigate(`/admin/jobs/${job._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
												<Edit2 className='w-4' />
												<span>Edit</span>
											</div> */}
											<div onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
												<Eye />
												<span>Applicants</span>
											</div>
										</PopoverContent>
									</Popover>
								</TableCell>
							</TableRow>
						))
					}
				</TableBody>
			</Table>
		</div>
	)
}


export default AdminJobsTable