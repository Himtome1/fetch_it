"use client"
import { signIn, useSession, signOut } from "next-auth/react"
import Link from "next/link"
import Button from "../../components/Button"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

const BG = "bg-gray-100"

const user_id = 1


export default function App() {
    const data = useSession().data
    const router = useRouter()

    const [jobs, setJobs] = useState(null)
    const [selectedJob, setSelectedJob] = useState(null)

    useEffect(
        ()=>{
            if(!data){
                router.push("/")
            }
        },
        [data]
    )
    useEffect(()=>{
        if(data && data.user.driver == false){
         router.push("/")
        }
         
     },[])
    useEffect(()=>{
        const fetchData = async () => {
            const res = await fetch("../api/jobs/queryJobs")
            const data = await res.json()
            console.log(data)
            setJobs(data)
        }
        fetchData()
    },[])



    return(
        <div className={`w-screen h-screen flex ${BG}`}>
            <div className={`w-1/3 ${BG} h-screen pl-5 flex flex-col justify-evenly items-center`}>
                <div className="w-full h-1/3 bg-white flex-col border-gray-300 border-2 items-center rounded-3xl flex">
                < h1 className="text-3xl text-gray-600 font-bold">Assigned Jobs</h1>
                {jobs?jobs.map(
                    (job)=>{
                        if(job.user_id == user_id){
                            return(
                                <div className="w-1/2 h-min p-2 m-2 bg-white flex-col items-center rounded-xl ">
                                    <button onClick={()=>setSelectedJob(job.job_id)} className="w-full h-min bg-green-200 rounded-md">
                                        {job.description}
                                    </button>
                                </div>
                            )
                        }
                        else return (null)
                    }):<p>No assigned jobs</p>}
                </div>
                <div className="w-full h-1/3 rounded-3xl bg-white flex border-gray-300 border-2 flex-col items-center">
                < h1 className="text-3xl text-gray-600 font-bold">Interactions</h1>
                    <div className="flex flex-col items-center justify-evenly h-full w-full">
                        <Button type="regular" color="blue" text="User Mode"/>
                        <Button type="regular" color="blue" text="Settings"/>
                        <Button type="regular" color="blue" text="Sign Out"/>
                    </div>
                </div>
            </div>
            <div className={`w-full h-full p-20 rounded-3xl ${BG} flex flex-col items-center`}>
                <div className="w-full h-full bg-white bg-white pr-4 border-gray-300 border-2 flex-col items-center rounded-xl">
                    {jobs?(jobs.map((job)=>{

                        
                        if(selectedJob == null){
                        return(
                            <button key={job.job_id} onClick={()=>setSelectedJob(job.job_id)} className="w-full h-min p-2 m-2 bg-green-200 rounded-md">
                                {job.description}
                            </button>
                        )}
                        else if(job.job_id == selectedJob){
                            return(
                                <div className="w-full h-min p-2 m-2 bg-green-200 rounded-md">
                                    <p>Description: {job.description}</p>
                                    <p>Pickup location: {job.pickup_location}</p>
                                    <p>Dropoff location: {job.dropoff_location}</p>
                                    <p>Pay: ${job.price}</p>
                                    <p>Road time: {job.time} hrs</p>
                                    <p>Distance: {job.distance} km</p>
                                    <Button type="regular" color="blue" text="Back" callback={()=>setSelectedJob(null)}/>
                                </div>
                            )
                        }
                        else return null
                    })):<p>No active postings</p>}
                </div>
            </div>
        </div>
    )
}