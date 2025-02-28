import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/redux/jobSlice'


const catagory = ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Data Science", "Senior Developer", "SSD", "SDE2", "Application Developer", "Java Developer", "Web Developer"]

const CatagoryCarousel = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const searchJobHandler = (query) => {
		dispatch(setSearchedQuery(query));
		navigate("/browse");
	}

	return (
		<div>
			<Carousel className='w-full max-w-xl mx-auto my-20'>
				<CarouselContent>
					{
						catagory.map((cat, index) => (
							<CarouselItem className='md:basis-1/2 lg:basis-1/3'>
								<Button variant='outline' className='rounded-full' onClick={() => searchJobHandler(cat)}>{cat}</Button>
							</CarouselItem>
						))
					}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</div>
	)
}

export default CatagoryCarousel