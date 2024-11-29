import React from 'react'
import place1 from '../../assets/place1.png'
import { Button } from '@/components/ui/button'
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useEffect,useState } from 'react';
import {PHOTO_REF_URL,GetPlaceDetails} from '../../service/GlobalApi'
import defaultImage from '../../assets/place1.png'

function PlaceCardItem({place}) {

    const [photoUrl,setPhotoUrl]=useState();
    useEffect(()=>{
        place && GetPlacePhoto();
    },[place])

    const GetPlacePhoto =async()=>{
        const data ={
            textQuery:place?.placeName
        }
        const result = await GetPlaceDetails(data).then(resp=>{
            // console.log(resp.data)
            const PhotoUrl = PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[2].name);
            setPhotoUrl(PhotoUrl)
        })
    }
    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query='+place.placeName} target='_blank'>
            <div className='bg-[#2C74B3] rounded-xl p-3 flex gap-5'>
                <img src={photoUrl ? photoUrl : defaultImage} className='w-[200px] h-[200px] rounded-xl' alt="" />
                <div className='flex flex-col gap-3'>
                    <h2 className='font-bold text-lg'>📍{place.placeName}</h2>
                    <p>{place.placeDetails}</p>
                    <h2 className='font-bold text-orange-400'>⏰{place.travelTime}</h2>
                    
                        {/* <Button className='w-14'>
                            <FaMapLocationDot style={{width:"3rem", color:"red"}}/>
                        </Button> */}
                    
                </div>
            </div>
        </Link>
    )
}

export default PlaceCardItem
