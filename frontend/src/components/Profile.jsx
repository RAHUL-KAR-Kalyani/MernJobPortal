import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact2, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const isResume = true;

const Profile = () => {
	// to change document title
	useEffect(() => {
		document.title = "Profile";
	}, []);

	useGetAppliedJobs();
	const [open, setOpen] = useState(false)
	const { user } = useSelector(store => store.auth);

	return (
		<div>
			<Navbar />
			<div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
				{/* profile photo and summery area */}
				<div className='flex justify-between'>
					<div className='flex items-center gap-4'>
						<Avatar className="h-24 w-24">
							<AvatarImage src={user?.profile?.profilePhoto} alt="Profile" />
						</Avatar>
						<div>
							<h1 className='font-medium text-xl'>{user?.fullname}</h1>
							{/* <h1 className='font-medium text-xl'>{user?.fullname}, <span className='font-normal ms-6'>{user?.role}</span></h1> */}
							<p>{user?.profile?.bio}</p>
						</div>
					</div>
					<Button className="text-right" variant="outline" onClick={() => setOpen(true)}><Pen /></Button>
				</div>

				{/* contact area */}
				<div className='my-5'>
					<div className='flex items-center gap-3 my-2'>
						<Mail />
						<span>{user?.email}</span>
					</div>

					<div className='flex items-center gap-3 my-2'>
						<Contact2 />
						<span>{user?.phoneNumber}</span>
					</div>
					{/* <div className='flex items-center gap-3 my-2'>
						<Contact2 />
						<span className='capitalize'>{user?.role}</span>
					</div> */}
				</div>

				{/* skills and resume area */}
				<div className='my-5'>
					{/* <h1>Skills</h1> */}
					<Label className="text-md font-bold ">Skills</Label>
					<div className='flex items-center gap-2'>
						{
							user?.profile?.skills.length != 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>No skills added</span>
						}
					</div>
				</div>
				<div className='grid w-full max-w-sm items-center gap-1.5'>
					<Label className="text-md font-bold ">Resume</Label>
					{
						// isResume ? <a target='blank' href={user?.profile?.resume} className='text-gray-700 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
						user?.profile?.resume ? <a target='blank' href={user?.profile?.resume} className='text-gray-700 w-full hover:underline cursor-pointer hover:text-blue-500'>{user?.profile?.resumeOriginalName}</a> : <span>No resume attached</span>
					}
				</div>
			</div>
			{/* Application History or Applied Positions or Application Status */}
			<div className='max-w-4xl mx-auto bg-white rounded-2xl'>
				<h1 className='font-bold text-lg my-5'>All Applied Job</h1>
				<AppliedJobTable />
			</div>

			<UpdateProfileDialog open={open} setOpen={setOpen} />
		</div>
	)
}

export default Profile