"use client"
import { signIn, useSession, signOut } from "next-auth/react"
import Link from "next/link"

export default function App() {
    const data = useSession().data
    console.log(data)
    
    return(
        <div className="w-screen flex flex-col items-center justify-center h-screen bg-blue-900">
            {data? 
            
            <p className="text-7xl font-bold text-white">
                Welcome Home {data.user.email}
            <button onClick = {()=>signOut({callbackUrl:"/"})} className="bg-green-900 items-center flex justify-center w-1/10 h-1/10 rounded-lg">Sign Out</button>
            </p>
            
            :(
            <div>
            <p className="text-7xl font-bold text-white">
               You must be signed in to view this page
            </p>
            <p className="text-3xl font-bold text-white">
                Please sign in here: 
            </p>
            <Link href={"/signIn"}>Sign In</Link>
            </div>
            
            )}   
        </div>
    )
}