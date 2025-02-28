import React from 'react'

const Footer = () => {
	return (
		<footer className="bg-gray-900 text-white py-8">
			<div className="container mx-auto px-6 md:px-12">
				<div className="flex flex-col md:flex-row justify-between items-center">					
					<div className="text-center md:text-left mb-6 md:mb-0">
						<h2 className="text-2xl font-bold text-white">Job<span className='text-[#F83002]'>Portal</span></h2>
						{/* <p className="text-sm mt-2 text-gray-400">Your best place for quality products and services</p> */}
					</div>

					<div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
						<a href="#" className="text-gray-400 hover:text-teal-400 transition">About Us</a>
						<a href="#" className="text-gray-400 hover:text-teal-400 transition">Services</a>
						<a href="mailto:support@jobportal.com" className="text-gray-400 hover:text-teal-400 transition">Contact</a>
						<a href="#" className="text-gray-400 hover:text-teal-400 transition">Privacy Policy</a>
					</div>

					<div className="flex justify-center md:justify-end space-x-6 mt-6 md:mt-0">
						<a href="#" className="text-gray-400 hover:text-teal-400 transition">
							<i className="fab fa-facebook-f"></i>
						</a>
						<a href="#" className="text-gray-400 hover:text-teal-400 transition">
							<i className="fab fa-twitter"></i>
						</a>
						<a href="#" className="text-gray-400 hover:text-teal-400 transition">
							<i className="fab fa-instagram"></i>
						</a>
					</div>
				</div>

				<div className="text-center mt-6 text-sm text-gray-500">
					<p>© 2024 JobPortal. All rights reserved.</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer