import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import { doc, setDoc ,getDoc} from "firebase/firestore"; 
import {db} from '../../service/FirebaseConfig'
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';

function ViewTrip() {

    const {tripId}=useParams();
    const [trip,setTrip]=useState();

    useEffect(()=>{
        tripId && GetTripData();
    },[tripId])

    const GetTripData = async()=>{
        // console.log("Querying Firestore for document ID:", tripId);
        const docRef = doc(db, 'AITrips', tripId);
        const docSnap = await getDoc(docRef);
        // console.log("Firestore response:", docSnap.exists(), docSnap.data());        

        if(docSnap.exists()){
            // console.log("Document:",docSnap.data());
            setTrip(docSnap.data());
        }
        else{
            // console.log("No such document Found")
            toast("No trip found!")
        }
    }
    return (
        <div className='p-10 md:px-20 lg:px-24 xl:px-40'>
            {/* Information Section */}
            <InfoSection trip={trip}/>
            {/* recommended Hotel */}
            <Hotels trip={trip}/>
            {/* Daily plan */}
            <PlacesToVisit trip={trip}/>
            {/* Footer */}
            <Footer trip={trip}/>
        </div>
    )
}

export default ViewTrip
