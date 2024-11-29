import { collection, query ,where,getDocs} from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {db} from '../service/FirebaseConfig'
import UserTripCardItem from './components/UserTripCardItem';


function MyTrip() {

    const navigate = useNavigate();
    const [userTrips, setUserTrips] = useState([]);

    useEffect(()=>{
        GetUserTrips();
    },[])
    const GetUserTrips =async()=>{
        const user = JSON.parse(localStorage.getItem('user'));
        if(!user){
            navigate('/');
            return;
        }
        
        const q=query(collection(db,'AITrips'),where('userEmail','==',user?.email));
        const querySnapshot = await getDocs(q);
        setUserTrips([]);
        querySnapshot.forEach((doc)=>{
            // console.log(doc.id,"=>",doc.data());
            setUserTrips(preVal => [...preVal,doc.data()]);
        })
    }
    return (
        <div className='px-40 p-10 text-white'>
            <h2 className='font-bold text-5xl my-10'>MyTrip</h2>
            <div className='grid grid-cols-3 gap-5'>
                {userTrips?.length>0?userTrips.map((trip,index)=>(
                    <UserTripCardItem className=' bg-[#2C74B3]' key={index} trip={trip}/>
                ))
            
            :[1,2,3,4,5,6].map((item,index)=>(
                <div key={index} className='h-[250px] w-full bg-[#2C74B3] animate-pulse rounded-xl'>
                </div>
            ))
            }
            </div>
        </div>
    )
}

export default MyTrip
