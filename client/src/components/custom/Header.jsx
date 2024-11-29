import React, { useEffect ,useState} from 'react'
import logo from '../../assets/TravelTrail AI_logo.png'
import logoName from '../../assets/TravelTrail AI_logo_withName.png'
import { Button } from '../ui/button'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    } from "@/components/ui/dialog"

import LogoWithName from '../../assets/TravelTrail AI_logo.png'
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
// import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore"; 
import {db} from '../../service/FirebaseConfig'


function Header() {
    const user =JSON.parse(localStorage.getItem('user'));
    useEffect(()=>{
        // console.log(user);
    },[user])

    // const navigate = useNavigate();

    const handleLogout=()=>{
        googleLogout();
        localStorage.clear();
        window.location.reload();
    }

    const [openDailog,setOpenDailog]=useState(false);

    const login = useGoogleLogin({
        onSuccess:(codeResp) => GetUserProfile(codeResp),
        onError: (error) => console.log(error)
    })

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
            // OnGenerateTrip();
            window.location.reload();

        })
        
    }
    return (
        <div className='p-2 shadow-2xl flex justify-between items-center px-10 bg-[#0A2647] py-3'> 
            <div className='w-40'>
                <img src={logoName} alt="" />
            </div>
            <div>
                {user?
                    <div className='flex items-center gap-5'>
                        <a href="/create-trip">
                            <Button variant='' className='bg-[#FF2E63] hover:bg-[#f7527b] text-lg rounded-full'>+Create Trip</Button>
                        </a>
                        <a href="/my-trips">
                            <Button variant='' className='bg-[#FF2E63] hover:bg-[#f7527b] text-lg rounded-full'>My Trips</Button>
                        </a>
                        <Popover>
                            <PopoverTrigger>                        
                                <img className='rounded-full h-[35px] w-[35px]' src={user?.picture} alt="" />
                            </PopoverTrigger>
                            <PopoverContent>
                                <h2 className='cursor-pointer' onClick={handleLogout}>Logout</h2>
                            </PopoverContent>
                        </Popover>
                    </div>
                    :
                    <Button onClick={()=>setOpenDailog(true)}>SignUp</Button>
                }
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

export default Header
