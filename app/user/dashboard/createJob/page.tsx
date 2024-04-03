"use client"
import { signIn, useSession, signOut } from "next-auth/react"
import Link from "next/link"
import Button from "../../../components/Button"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Input from "../../../components/Input"
import Dropdown from "../../../components/Dropdown"
import Increment from "../../../components/Increment"


interface jobObjectLargeItems{
    loadType: "largeItems"
    details:{
        manifest: object[]
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
async function generateJob(pickupTime:Date, userEmail:string, title:string, description:string, jobObject:jobObjectGarbage|jobObjectLargeItems|jobObjectLooseMaterial, dropOffLocation:location, pickupLocation:location){
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
    const [pickupLocation, setPickupLocation] = useState<location>()
    const [jobObject, setJobObject] = useState<jobObjectGarbage|jobObjectLargeItems|jobObjectLooseMaterial>()
    const [title, setTitle] = useState<string>()
    const [loadType, setLoadType] = useState<"largeItems"|"looseMaterial"|"garbage">()
    const [description, setDescription] = useState<string>()
    const [pickupTime, setPickupTime] = useState<Date>()
    const [progress, setProgress] = useState<number>(0)
    const [labour, setLabour] = useState<jobObjectLargeItems["details"]["estimatedLabor"]>(0.2)
    const [quantity, setQuantity] = useState<jobObjectLargeItems["details"]["quantity"]>(1.0)
    const [manifest, setManifest] = useState<jobObjectLargeItems["details"]["manifest"]>([])
    const [twoMan, setTwoMan] = useState<jobObjectLargeItems["details"]["twoMan"]>(false)
    const [details, setDetails] = useState<jobObjectLargeItems["details"]>({
        manifest: manifest,
        twoMan: twoMan,
        quantity: quantity,
        estimatedLabor: labour
    })
    

    const listArray = ["largeItems" , "garbage","looseMaterial" ]
    return(
        <div className="w-screen flex-col h-screen bg-gray-200">
            
            {progress===0?
            <div key={0} className="flex-col flex items-center h-2/3 justify-top py-10 ">
                Title <Input type="text" placeholder={title?title:null} setValue={setTitle}/>
                Description <Input type="text" placeholder={description?description:null} setValue={setDescription}/>
                Type of Load <Dropdown listArray={listArray} textColor="black" bg="white" itemColor="gray-200" item={loadType} setItem={setLoadType}/>
            </div>:
            progress===1&&loadType==="largeItems"?
            <div key={1} className="flex-col flex items-center h-2/3 justify-top py-10 ">
                Quantity of large items estimate: <Increment value={quantity} increment={1} setValue={setQuantity}/>
                Labour estimate in hours: <Increment value={labour} increment={0.1} setValue={setLabour}/>
                Please provide a manifest of the items you need moved:
            
            </div>:
            null
            
            
            }
            <div className="px-5 w-screen flex flex-row-reverse justify-between">
            <Button text="Next" color="white" type="regular" callback={()=>setProgress(progress+1)}/>
            {progress > 0 ? <Button text="Back" color="white" type="regular" callback={()=>setProgress(progress-1)}/> : null}
            </div>
        </div>
    )
}