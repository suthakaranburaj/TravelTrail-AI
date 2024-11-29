import React, { useEffect, useState } from 'react'
import InfoImage from '../../assets/Info.png'
import { Button } from '@/components/ui/button'
import { IoIosSend } from "react-icons/io";
// import { GetPlaceDetails } from '@/service/GlobalApi';
import {GetPlaceDetails} from '../../service/GlobalApi'
import defaultImage from '../../assets/Info.png'
const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=1000&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY
function InfoSection({trip}) {

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
        <div>
            <img className='rounded-xl h-[540px] w-full object-cover ' src={photoUrl ? photoUrl : defaultImage} alt="" />
            <div className='flex justify-between items-center mt-10'>
                <div className=' flex flex-col gap-4'>
                    <h2 className='font-bold  text-4xl text-white'>{trip?.userSelection?.location?.label}</h2>
                    <div className='flex gap-5'>
                        <h2 className='text-white px-3 bg-blue-500 rounded-3xl py-2 font-bold'>
                            🗒️{trip?.userSelection?.noOfDays}Day 
                        </h2>
                        <h2 className='text-white px-3 bg-blue-500 rounded-3xl py-2 font-bold'>
                            💰{trip?.userSelection?.budget} Budget 
                        </h2>
                        <h2 className='text-white px-3 bg-blue-500 rounded-3xl py-2 font-bold'>
                            🧑‍🤝‍🧑Number of Traveler: {trip?.userSelection?.traveler}  
                        </h2>
                    </div>
                </div>
                <Button className="py-7 px-5"><IoIosSend style={{ width: "1.5rem", height: "1.5rem"}} /></Button>
            </div>
        </div>
    )
}

export default InfoSection
