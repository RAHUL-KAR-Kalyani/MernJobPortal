import React from 'react'
import '../App.css'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
	const { allAppliedJobs } = useSelector(store => store.job);
	return (
		<div>
			<Table>
				<TableCaption>Jobs You've Applied To</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="">Applied Date</TableHead>
						<TableHead className="">Company</TableHead>
						<TableHead className="">Job Role</TableHead>
						<TableHead className="text-center">Status</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{
						allAppliedJobs.length <= 0 ? <span>You haven't applied any job yet.</span> : allAppliedJobs.map((appliedJob) => (
							<TableRow key={appliedJob?._id} className="select-none">
								<TableCell className="">{appliedJob?.createdAt?.split("T")[0]}</TableCell>
								<TableCell className="">{appliedJob?.job?.company?.name}</TableCell>
								<TableCell className="">{appliedJob?.job?.title}</TableCell>
								<TableCell className="text-center"><Badge className={`${appliedJob?.status === "rejected" ? 'bg-red-400 no-drop' : appliedJob?.status === "pending" ? 'bg-gray-500 progress' : 'bg-green-600 pointer'}`}>{appliedJob?.status.toUpperCase()}</Badge></TableCell>
								{/* <TableCell className={`text-center  ${appliedJob?.status === "rejected" ? 'no-drop' : appliedJob?.status === "pending" ? 'progress' : 'pointer'}`}><Badge className={`${appliedJob?.status === "rejected" ? 'bg-red-400' : appliedJob?.status === "pending" ? 'bg-gray-500' : 'bg-green-600'}`}>{appliedJob?.status.toUpperCase()}</Badge></TableCell> */}
							</TableRow>
						))
					}
				</TableBody>
			</Table>
		</div>
	)
}

export default AppliedJobTable