import {Input} from '../components/ui/input';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import {SelectTravelesList,SelectBudgetOptions,AI_PROMPT} from '../constants/options'
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { chatSession } from '@/service/AIModel';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    } from "@/components/ui/dialog"

import LogoWithName from '../assets/TravelTrail AI_logo_withName.png'
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore"; 
import {db} from '../service/FirebaseConfig'
import { useNavigate } from 'react-router-dom';


function CreateTrip() {

    const [place,setPlace] = useState();

    const [formData,setFormData] = useState([]);
    const [openDailog,setOpenDailog]=useState(false);
    const [loading , setLoading]=useState(false);
    const navigate = useNavigate();
    const handleInputChange = (name,value)=>{

        setFormData({
            ...formData,
            [name]:value
        })
    }

    const login = useGoogleLogin({
        onSuccess:(codeResp) => GetUserProfile(codeResp),
        onError: (error) => console.log(error)
    })
    
    const OnGenerateTrip=async()=>{

        const user = localStorage.getItem("user");
        if(!user){
            setOpenDailog(true);
            return;
        }
        if(formData?.noOfDays > 7 || formData?.noOfDays < 1 ){
            toast("Please enter trip days less than 7 or more than 1")
            return;
        }
        if(!formData?.location || !formData?.budget ||!formData?.traveler || !formData?.noOfDays){
            toast("Please fill all detials")
            return;
        }
        setLoading(true);
        const FINAL_PROMPT= AI_PROMPT
        .replace('{location}',formData?.location?.label)
        .replace('{totalDays}',formData?.noOfDays)
        .replace('{traveler}',formData?.traveler)
        .replace('{budget}',formData?.budget)
        .replace('{totalDays}',formData?.noOfDays)

        // console.log(FINAL_PROMPT)

        const result = await chatSession.sendMessage(FINAL_PROMPT)
        // console.log(result?.response?.text());
        setLoading(false);
        SaveAiTrip(result?.response?.text());
    }

    const SaveAiTrip = async(TripData)=>{

        // Add a new document in collection "cities"
        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user'));
        const docId = Date.now().toString();
        await setDoc(doc(db, "AITrips", docId), {
            userSelection : formData,
            tripData:JSON.parse(TripData),
            userEmail:user?.email,
            id:docId
        });
        console.log(docId);
        setLoading(false);
        navigate('/view-trip/'+docId)
    }

    const GetUserProfile=(tokenInfo)=>{
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,{
            headers:{
                Authorization:`Bearer ${tokenInfo?.access_token}`,
                Accept:'Application/json'
            }
        }).then((res)=>{
            // console.log(resp);
            localStorage.setItem('user',JSON.stringify(res.data));
            setOpenDailog(false);
            OnGenerateTrip();

        })
        
    }
    return (
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-60 mt-10'>
            <h2 className='font-bold text-5xl my-10'>Tell us your travel preferences⛺🌴</h2>
            <p className='mt-3 text-white text-xl'>
                Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences
            </p>
            <div>
                <div className='mt-20 flex flex-col gap-10'>
                    <div>
                        <h2 className='text-xl my-3 font-medium text-[#FF2E63]'>What is destination of choice?</h2>
                        <GooglePlacesAutocomplete
                            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                            selectProps={{
                                place,
                                onChange:(v)=>{setPlace(v);handleInputChange('location',v)}
                            }}
                        />
                    </div>
                    <div className=''>
                        <h2 className='text-[#FF2E63] text-xl font-medium my-3'>
                            How many days are you planning your trip
                        </h2>
                        <Input placeholder={'Eg:3'} type='number' 
                            onChange={(e)=>handleInputChange('noOfDays',e.target.value)}
                        />
                    </div>
                    <div>
                        <h2 className='text-xl my-3 font-medium text-[#FF2E63]'>What is your Budget?</h2>
                        <div className='grid grid-cols-3 gap-5 mt-5 '>
                            {SelectBudgetOptions.map((item,index)=>(
                                <div 
                                    key={index} 
                                    className={`p-4 border rounded-lg hover:border-white bg-[#2C74B3] cursor-pointer border-black
                                        ${formData?.budget == item.title && 'border-white bg-[#65b6fd]'}
                                    `}                                    
                                    onClick={()=>handleInputChange('budget',item.title)}
                                >
                                    <h2 className='text-5xl my-2'>{item.icon}</h2>
                                    <h2 className='font-bold text-2xl'>{item.title}</h2>
                                    <h2 className='text-white'>{item.desc}</h2>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2 className='text-xl my-3 font-medium text-[#FF2E63]'>Who do you plan on traveling with on your next adventure?</h2>
                        <div className='grid grid-cols-3 gap-5 mt-5 '>
                            {SelectTravelesList.map((item,index)=>(
                                <div 
                                    key={index} 
                                    className={`p-4 border rounded-lg  bg-[#2C74B3] cursor-pointer hover:border-white border-black
                                        ${formData?.traveler == item.people && 'bg-[#65b6fd] border-white '}
                                    `}
                                    onClick={()=>handleInputChange('traveler',item.people)}
                                >
                                    <h2 className='text-5xl my-2'>{item.icon}</h2>
                                    <h2 className='font-bold text-2xl'>{item.title}</h2>
                                    <h2 className='text-white'>{item.desc}</h2>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                </div>
                <div className='my-10 justify-center flex'>
                    <Button onClick={OnGenerateTrip} className='text-xl p-6'>
                        {loading ? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin'/> :'Generate Trip'}
                    </Button>
                </div>
            </div>
            <Dialog open={openDailog}>
                <DialogContent className="bg-[#205295]">
                    <DialogHeader className=''>
                    <DialogDescription>
                        <img className=' text-white w-40 h-12 mb-6' src={LogoWithName} alt="" />
                        <h2 className=' text-white font-bold text-lg'>Sign In with Google</h2>
                        <p className='text-white'>Sign in to the App with Google authentication securely</p>
                        <Button 
                        className='w-full mt-6 flex gap-2 items-center'
                        onClick={login}
                        >
                            <FcGoogle style={{ width: "1.5rem", height: "1.5rem" }} />
                            Sign In with Google 
                        </Button>
                    </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default CreateTrip
