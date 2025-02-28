import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CatagoryCarousel from './CatagoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
	// to change document title
	useEffect(() => {
		document.title = "Home";
	}, []);
	
	useGetAllJobs();
	const { user } = useSelector(store => store.auth);
	// !user ? "" : useGetAllJobs();
	const navigate = useNavigate();
	useEffect(() => {
		if (user?.role === 'recruiter') {
			navigate("/admin/companies")
		}
	}, [])

	return (
		<div>
			<Navbar />
			<HeroSection />
			<CatagoryCarousel />
			<LatestJobs />
			<Footer />
		</div>
	)
}

export default Home