import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
    return (
        <div className='flex items-center mx-52 gap-9 flex-col'>
            <h1 className='font-extrabold text-[60px] text-center mt-16'>
                <span className='text-[#2C74B3]'>Discover new places, with AI as your guide:</span>Adventures unfold, far and wide.
            </h1>
            <p className='text-center text-2xl text-white mt-10'>Your personal trip planner and travel curator, creating custom intineraries tailored to your interest and budget</p>
            <Link to={'/create-trip'}>
                <Button className='text-xl p-6 text-[#FF2E63]' >Get Started, It's Free</Button>
            </Link>
        </div>
    )
}

export default Hero
