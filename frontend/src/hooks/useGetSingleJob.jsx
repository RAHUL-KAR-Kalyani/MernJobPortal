import { useEffect } from 'react'
import { JOB_API_ENDPOINT } from '@/utils/constant'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setSingleJob } from '@/redux/jobSlice'


const useGetSingleJob = (jobID) => {
	const dispatch=useDispatch()
	useEffect(()=>{
		const fetchSingleJob=async()=>{
			try {
				const res=await axios.get(`${JOB_API_ENDPOINT}/alljob/${jobID}`,{withCredentials:true});
				if(res.data.success){
					dispatch(setSingleJob(res.data.jobs));
				}
			} catch (error) {
				console.log(error)
			}
		}
		fetchSingleJob();
	},[])
}

export default useGetSingleJob