import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {

    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // for mouse click
    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    // for enter button. added on input field
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            searchJobHandler();
        }
    }

    return (
        <div className='text-center'>
            <div className='flex flex-col gap-3 my-5'>

                <span className='mx-auto px-4 py-2 rounded-full bg-gray-200 text-[#F83002] font-medium'>No. 1 Job Hunt Website</span>

                <h1 className='text-5xl font-bold'>
                    Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>DreamJob </span>
                </h1>

                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, deserunt!</p>

                <div className='flex w-[40%] shadow-lg border border-gray-500 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input type="text" placeholder='Find Your Dream Jobs' className='outline-none border-none w-full' onChange={(e) => setQuery(e.target.value)} onKeyPress={handleKeyPress} />
                    <Button className='rounded-r-full bg-[#6A38C2]' onClick={searchJobHandler}><Search className='h-5 w-5' /></Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection