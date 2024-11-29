import React from 'react'
import hotel1 from '../../assets/hotel1.png'
import { useEffect,useState } from 'react';
import { GetPlaceDetails } from '../../service/GlobalApi';
import {PHOTO_REF_URL} from '../../service/GlobalApi';
import { Link } from 'react-router-dom';

function UserTripCardItem({trip}) {

    const [photoUrl,setPhotoUrl]=useState();
    useEffect(()=>{
        trip && GetPlacePhoto();
    },[trip])

    const GetPlacePhoto =async()=>{
        const data ={
            textQuery:trip?.userSelection?.location?.label
        }
        const result = await GetPlaceDetails(data).then(resp=>{
            // console.log(resp.data)
            const PhotoUrl = PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[2].name);
            setPhotoUrl(PhotoUrl)
        })
    }
    return (
        <Link to={`/view-trip/${trip?.id}`}>
        <div className='bg-[#2C74B3] rounded-xl m-5'>
            <img src={photoUrl ? photoUrl : hotel1} className='object-cover rounded-t-xl h-[240px] w-full' alt="" />
            <div className='p-4'>
                <h2 className='text-xl font-bold '>{trip?.userSelection?.location?.label}</h2>
                <h2 className='text-gray-400'>{trip?.userSelection.noOfDays} Days trip with {trip?.userSelection?.budget}Budget</h2>
            </div>
        </div>
        </Link>
    )
}

export default UserTripCardItem
