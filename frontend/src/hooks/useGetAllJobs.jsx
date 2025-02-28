import { useEffect } from 'react'
import { JOB_API_ENDPOINT } from '@/utils/constant'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setAllJobs } from '@/redux/jobSlice'

const useGetAllJobs = () => {

	const dispatch = useDispatch()	
	const { searchedQuery } = useSelector(store => store.job);

	useEffect(() => {
		const fetchAllJobs = async () => {
			try {
				const res = await axios.get(`${JOB_API_ENDPOINT}/alljob?keyword=${searchedQuery}`, { withCredentials: true });
				// const res = await axios.get(`${JOB_API_ENDPOINT}/alljob`, { withCredentials: true });
				if (res.data.success) {
					dispatch(setAllJobs(res.data.jobs));
				}
			} catch (error) {
				console.log(error)
			}
		}
		fetchAllJobs();
	}, [])
}

export default useGetAllJobs