import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect,useState } from 'react';
import { GetPlaceDetails } from '../../service/GlobalApi';
import {PHOTO_REF_URL} from '../../service/GlobalApi';
import defaultImage from '../../assets/hotel1.png'



function HotelCardItem({hotel}) {

    const [photoUrl,setPhotoUrl]=useState();
    useEffect(()=>{
        hotel && GetPlacePhoto();
    },[hotel])

    const GetPlacePhoto =async()=>{
        const data ={
            textQuery:hotel?.hotelName
        }
        const result = await GetPlaceDetails(data).then(resp=>{
            // console.log(resp.data)
            const PhotoUrl = PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[2].name);
            setPhotoUrl(PhotoUrl)
        })
    }
    return (
        <div>
            <Link 
            to={'https://www.google.com/maps/search/?api=1&query='+hotel?.hotelName +" "+hotel?.hotelAddress} 
            className='bg-[#2C74B3] rounded-xl hover:scale-105 transition-all cursor-pointer' 
            target='_blank'
            >
                <div className='  border-[#2C74B3] duration-150'>
                    <div className='h-[200px] w-full'>
                        <img src={photoUrl ? photoUrl : defaultImage} className='rounded-t-xl w-full h-full' alt="" />
                    </div>
                    <div className='my-3 px-2 flex flex-col gap-2'>
                        <h2 className='font-medium text-white'>{hotel?.hotelName}</h2>
                        <h2 className='text-xs text-gray-300 mt-2'>📍{hotel?.hotelAddress}</h2>
                        <h2 className='text-sm text-red-500'>💲{hotel?.price}</h2>
                        <h2 className='text-sm text-red-500'>⭐{hotel?.rating}</h2>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default HotelCardItem
