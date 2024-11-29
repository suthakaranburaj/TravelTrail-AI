import React from 'react'
import hotel3 from '../../assets/hotel3.png'
import { Link } from 'react-router-dom'
import HotelCardItem from './HotelCardItem'

function Hotels({trip}) {
    return (
        <div className='mt-10'>
            <h2 className='font-bold text-2xl text-white'>Hotel Recommendation</h2>
            <div className='grid grid-cols-2 md:grid-col-3 xl:grid-cols-4 gap-5 mt-5'>
                {trip?.tripData?.hotels?.map((hotel,index)=>(
                    <div key={index} className='bg-[#2C74B3] rounded-xl my-3 hover:scale-105 transition-all cursor-pointer' >
                        <HotelCardItem key={index} hotel={hotel}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Hotels
