"use client"
import { signIn, useSession, signOut } from "next-auth/react"
import Link from "next/link"

export default function App() {
    const data = useSession().data
    
    return(
        <div className="w-screen flex flex-col items-center justify-center h-screen bg-blue-900">
            {data? 
                data.user.driver ?
            <div>
            <p className="text-7xl font-bold text-white">
                Welcome Home {data.user.name}
            <button onClick = {()=>signOut({callbackUrl:"/"})} className="bg-green-900 items-center flex justify-center w-1/10 h-1/10 rounded-lg">Sign Out</button>
            </p>
            </div>
            : 
            <div className="items-center flex flex-col text-center justify-center">
                <p className="text-7xl font-bold text-white">
                You must be a driver to view the driver dashboard
                </p>
                <p className="text-2xl font-bold text-white">
                Click here to return to user dashboard: 
                </p>
                <Link  href={"/user/dashboard"}>
                    <div style={{width:"100px", height:"33px"}} className=" items-center justify-center rounded-lg bg-white flex ">
                        Return
                    </div>
                </Link>
                <p className="text-2xl font-bold text-white">
                Interested in driving?
                </p>
                <Link  href={"/driver/signUp"}>
                    <div style={{width:"100px", height:"33px"}} className=" items-center justify-center rounded-lg bg-white flex ">
                        Apply
                    </div>
                    </Link>

            </div>
            

            :(
            <div>
            <p className="text-7xl font-bold text-white">
               You must be signed in to view this page
            </p>
            <p className="text-3xl font-bold text-white">
                Please sign in here: 
            </p>
            <Link href={"/driver/signIn"}>Sign In</Link>
            </div>
            
            )}
        </div>
    )
}