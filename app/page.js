"use client"
import { signIn, useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function App() {

    const [url, setUrl] = useState({user:'/user/signIn', driver: '/driver/signIn'})
    const {status} = useSession()
    const data = useSession().data
   
    useEffect(
        ()=>{
            if(status=="authenticated"){
                if(data.user.driver)
                setUrl({user:"/user/dashboard", driver:"/driver/dashboard"})
                if(!data.user.driver)
                setUrl({user:"/user/dashboard", driver:"/driver/signIn"})
            }
            
        },[status]
    )

        
    
    return(
        <div className="w-screen flex flex-col items-center justify-center h-screen bg-blue-900">
           
            <p className="text-7xl font-bold text-white">
                Fetch.it
            </p>

            <div>
            
            <p className="text-3xl font-bold text-white">
               Are you a <Link className="hover:text-yellow-400" href={url.driver}>Driver</Link> or do you need a <Link className="hover:text-yellow-400" href={url.user}>Delivery</Link>?
            </p>

            </div>
            

        </div>
    )
}