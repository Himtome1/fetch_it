"use client"
import { signIn, useSession, signOut } from "next-auth/react"
import Link from "next/link"
import Button from "../../../components/Button"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Input from "../../../components/Input"
import Dropdown from "../../../components/Dropdown"


interface jobObjectLargeItems{
    loadType: "largeItems"
    details:{
        manifest: object
        twoMan:boolean
        quantity:number
        estimatedLabor:number //hours
    }
}
interface jobObjectLooseMaterial {
    loadType: "looseMaterial"
    details:{
        material: "soil" | "gravel" | "sand" | "mulch" | "roadbase"
        quantity: number //yards
        driverTools: boolean
        toolsRequired: {
            shovel: boolean
            rake: boolean
            broom: boolean
        }
        estimatedLabor:number
    }
}
interface jobObjectGarbage {
    loadType: "garbage"
    details:{
        twoMan:boolean
        recyclingBags: number
        largeItems: number //large items could mean couch, tv, mattress
        garbageBags: number
        estimatedLabor:number
    }
}
interface location {
    country: "Canada"
    province: "BC"
    city: string
    address: string
    postalCode: string
}
async function generateJob(userEmail:string, title:string, description:string, jobObject:jobObjectGarbage|jobObjectLargeItems|jobObjectLooseMaterial, dropOffLocation:location, pickupLocation:location){
    console.log(
        userEmail,
        title,
        description,
        {jobObject},
        {pickupLocation},
        {dropOffLocation}
    )
}

export default function App() {
    const {data} = useSession()
    const router = useRouter()
    useEffect(
        ()=>{
            if(!data){
                router.push("/")
            }
        },
        [data]
    )
    
    const [dropOffLocation, setDropOffLocation] = useState<location>()

    const listArray = ["Large Items (Non Garbage)" , "Garbage/Recycling","Loose Material" ]
    return(
        <div className="w-screen flex-col h-screen bg-gray-200">
            <div className="flex-col flex items-center justify-center ">
                Title <Input type="text"/>
                Description <Input type="text"/>
                Type of Load <Dropdown listArray={listArray} textColor="black" bg="white" itemColor="gray-200" setItem={()=>null}/>
                Pickup Location <Input type="text"/>
                Drop off Location<Input type="text"/>
                Time of pickup <input type="datetime-local"/>
            </div>
        </div>
    )
}