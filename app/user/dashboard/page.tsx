"use client"
import { use, useState,useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"


export default function Dashboard() {

    const {data:session} = useSession()

    const router = useRouter()

    useEffect(()=>{
        if(!session){
            router.push("/login")
        }
    })

    return(
        <div className="flex flex-col items-center justify-center h-screen w-screen">
            <h1 className="text-4xl">Welcome to the Dashboard</h1>
            <p className="text-lg">You are logged in as {session?.user.name}</p>
            <button onClick={()=>router.push("./dashboard//createJob")} className="border-2 border-gray-300 p-2 m-2 rounded-lg">Create a Job</button>

        </div>
    )
}