import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { motion } from 'framer-motion';
import Footer from './shared/Footer'


// 👋 w-1/5=width:20%  w-4/5 =width:80%

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8,]

const Jobs = () => {

	// to change document title
	// useEffect(() => {
	// 	document.title = "Jobs";
	// }, []);

	const { allJobs, searchedQuery } = useSelector(store => store.job);
	const [filterJobs, setFilterJobs] = useState(allJobs);

	const dispatch = useDispatch();
	useEffect(() => {
		document.title = "Jobs";
		return () => {
			dispatch(setSearchedQuery(""));
		}
	}, [])


	useEffect(() => {
		if (searchedQuery) {
			const filteredJobs = allJobs.filter((job) => {
				return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
					job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
					job.location.toLowerCase().includes(searchedQuery.toLowerCase())
			})
			setFilterJobs(filteredJobs)
		}
		else {
			setFilterJobs(allJobs)
		}

	}, [allJobs, searchedQuery])

	return (
		<div className=''>
			<Navbar />

			<div className='max-w-7xl mx-auto mt-5'>
				<div className='flex gap-5'>
					<div className='w-20%'>
						<FilterCard />
					</div>
					{
						filterJobs.length <= 0 ? <span className='text-center text-2xl'>No job listings are currently available. Please check back later. ⏳</span> : (
							<div className='flex-1 h-[86vh] overflow-y-auto pb-5'>
								<div className='grid grid-cols-3 gap-4'>
									{
										filterJobs?.map((job) =>
											<motion.div
												key={job?._id}
												initial={{ opacity: 0, x: 100 }}  // Start with opacity 0
												animate={{ opacity: 1, x: 0 }}  // Animate to opacity 1
												exit={{ opacity: 0, x: -100 }}
												transition={{ duration: 0.5 }}  // Duration of 0.5 seconds
											>
												<Job job={job} />
											</motion.div>
										)
									}
								</div>
							</div>
						)
					}
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default Jobs
