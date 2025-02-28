import React from 'react'
import { useEffect } from 'react'
import { COMPANY_API_ENDPOINT } from '@/utils/constant'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_ENDPOINT}/company/${companyId}`, { withCredentials: true });
                console.log(res.data.company);
                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchSingleCompany();
    }, [companyId, dispatch])
}

export default useGetCompanyById



