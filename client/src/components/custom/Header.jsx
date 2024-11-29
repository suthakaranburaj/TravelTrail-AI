import React, { useEffect } from 'react'
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


function Header() {
    const user =JSON.parse(localStorage.getItem('user'));
    useEffect(()=>{
        // console.log(user);
    },[user])

    const navigate = useNavigate();

    const handleLogout=()=>{
        googleLogout();
        localStorage.clear();
        navigate('/')
    }
    return (
        <div className='p-2 shadow-2xl flex justify-between items-center px-10 bg-[#0A2647] py-3'> 
            <div className='w-40'>
                <img src={logoName} alt="" />
            </div>
            <div>
                {user?
                    <div className='flex items-center gap-5'>
                        <Button variant='' className='bg-[#FF2E63] hover:bg-[#f7527b] text-lg rounded-full'>My Trips</Button>
                        <Popover>
                            <PopoverTrigger>                        
                                <img className='rounded-full h-[35px] w-[35px]' src={user?.picture} alt="" />
                            </PopoverTrigger>
                            <PopoverContent>
                                <p onClick={handleLogout}>Logout</p>
                            </PopoverContent>
                        </Popover>
                    </div>
                    :
                    <Button>SignUp</Button>
                }
            </div>
        </div>
    )
}

export default Header
