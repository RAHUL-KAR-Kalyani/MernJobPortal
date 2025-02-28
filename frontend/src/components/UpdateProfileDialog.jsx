import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_ENDPOINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {
	const [loading, setLoading] = useState(false);
	const { user } = useSelector(store => store.auth);
	const [input, setInput] = useState({
		fullname: user?.fullname,
		email: user?.email,
		phoneNumber: user?.phoneNumber,
		bio: user?.profile?.bio,
		skills: user?.profile?.skills?.map(skill => skill),
		file: user?.profile?.resume
	});

	const dispatch = useDispatch();

	const changeEventHandler = (e) => {
		setInput({ ...input, [e.target.name]: e.target.value });
	}

	const fileChangeHandler = (e) => {
		const file = e.target.files?.[0];
		setInput({ ...input, file })
	}

	const submitHandler = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("fullname", input.fullname);
		formData.append("email", input.email);
		formData.append("phoneNumber", input.phoneNumber);
		formData.append("bio", input.bio);
		formData.append("skills", input.skills);
		if (input.file) {
			formData.append("file", input.file);
		}
		try {
			setLoading(true)
			const res = await axios.post(`${USER_API_ENDPOINT}/profile/update-user`, formData, {
				headers: {
					"Content-Type": "multipart/form-data"
				},
				withCredentials: true,
			});
			if (res.data.success) {
				dispatch(setUser(res.data.user));
				toast.success(res.data.message);
			}
		} catch (error) {
			console.log(error);
			toast.error(error.response.data.message);
		} finally{
			setLoading(false);
		}
		setOpen(false);
		console.log(input);
		console.log(formData ,"dialoge");
	}


	return (
		<div>
			<Dialog open={open}>
				<DialogContent className="sm:max-[425px]" onInteractOutside={() => setOpen(false)}>
					<DialogHeader>
						<DialogTitle>Update Profile</DialogTitle>
					</DialogHeader>
					<form onSubmit={submitHandler}>
						<div className='grid gap-4 py-4'>
							<div className='grid grid-cols-4 items-center gap-4'>
								<Label htmlFor="name" className="text-right">Name</Label>
								<Input type="text" id="fullname" className="col-span-3 outline outline-1 outline-gray-300" value={input.fullname} onChange={changeEventHandler} name="fullname" />
							</div>
							<div className='grid grid-cols-4 items-center gap-4'>
								<Label htmlFor="email" className="text-right">Email</Label>
								<Input type="email" id="email" className="col-span-3 outline outline-1 outline-gray-300" value={input.email} onChange={changeEventHandler} name="email" />
							</div>
							<div className='grid grid-cols-4 items-center gap-4'>
								<Label htmlFor="number" className="text-right">Number</Label>
								<Input id="phoneNumber" className="col-span-3 outline outline-1 outline-gray-300" value={input.phoneNumber} onChange={changeEventHandler} name="phoneNumber" />
							</div>
							<div className='grid grid-cols-4 items-center gap-4'>
								<Label htmlFor="bio" className="text-right">Bio</Label>
								<Input id="bio" className="col-span-3 outline outline-1 outline-gray-300" value={input.bio} onChange={changeEventHandler} name="bio" />
							</div>
							<div className='grid grid-cols-4 items-center gap-4'>
								<Label htmlFor="skills" className="text-right">Skills</Label>
								<Input id="skills" className="col-span-3 outline outline-1 outline-gray-300" value={input.skills} onChange={changeEventHandler} name="skills" />
							</div>
							<div className='grid grid-cols-4 items-center gap-4'>
								<Label htmlFor="file" className="text-right">Resume</Label>
								<Input type="file" accept="application/pdf" id="file" className="col-span-3 outline outline-1 outline-gray-300" onChange={fileChangeHandler} name="file" />
							</div>
						</div>
						<DialogFooter>
							{
								loading ? <Button className="w-full my-4"> <Loader className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Update</Button>
							}
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default UpdateProfileDialog
