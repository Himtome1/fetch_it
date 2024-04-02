"use client"
import { signIn, useSession, signOut } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"





export default function App() {

const [jobs, setJobs] = useState(null)
const [loaded, setLoaded] = useState(false)

 useEffect(

    () => {
        fetch("http://localhost:3000/api/jobs/queryJobs", {method: "GET"})
        .then((res)=>
            res.json()
        )
        .then((res)=> { console.log(res), setJobs(res)})
        .then(()=>setLoaded(true))
    }, []
 )
 

    const {data, status} = useSession()
    const router = useRouter()

    useEffect(()=>{
        if (status == "unauthenticated") router.push('/')
    },[data])

    useEffect(()=>{
       if(data && data.user.driver == false){
        router.push("/")
       }
        
    },[])


    return(
        <div className="bg-blue-900 flex flex-col items-center justify-center w-screen h-screen ">
            <div className="flex flex-col w-2/3 h-1/2 bg-white items-center justify-center">
            {jobs?jobs.map(
                (job)=>{
                    console.log(jobs)
                    return(
                        <div key = {job.job_id} className="flex justify-evenly w-full m-2 bg-gray-200 border-gray-800 border-2">
                            <p>Pay: {job.price}</p>
                            <p>Distance: {job.distance}</p>
                            <p>Road Time: {job.time}</p>
                            <p>Date: {job.date}</p>
                            <p>Description: {job.description}</p>
                        </div>
                    )
                }
            ): null}
            </div>


        </div>

    )
}