import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({trip}) {
    // console.log(trip?.tripData?.itinerary)
    return (
        <div className='mt-5 text-white'>
            <h2 className='font-bold text-2xl'>Places to visit</h2>
            <div>
                {trip?.tripData?.itinerary?.map((item,index)=>(
                    <div key={index} className=''>
                        <h2 className='font-bold text-lg mt-5'>{item.day}</h2>
                        <h2 className='font-medium text-sm text-orange-400 '><span className='text-white'>Best time to Travel:</span>{item.bestTime}</h2>
                        <div className='grid grid-cols-2 gap-6 md:grid-cols-2 '>
                            {item?.plan?.map((place,index)=>(
                                <div key={index} className='my-3 hover:scale-105 transition-all cursor-pointer'>
                                    {/* <h2>{place.placeName}</h2> */}
                                    <PlaceCardItem place={place}/>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PlacesToVisit
