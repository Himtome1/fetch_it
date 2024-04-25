"use client"
import { ACCEPTED_COUNTRIES } from "../../../components/Constants"
import { ACCEPTED_PROVINCES } from "../../../components/Constants"
import { signIn, useSession, signOut } from "next-auth/react"
import Link from "next/link"
import Button from "../../../components/Button"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Input from "../../../components/Input"
import Dropdown from "../../../components/Dropdown"
import Increment from "../../../components/Increment"
import Manifest from "../../../components/Manifext"


interface jobObjectLargeItems{
    loadType: "largeItems"
    details:{
        manifest: {name:string, quantity:number}[]
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
    country: keyof typeof ACCEPTED_COUNTRIES
    province: keyof typeof ACCEPTED_PROVINCES
    city: string
    address: string
    postalCode: string
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

    const [orderInfo, setOrderInfo] = useState(null)
    

async function generateJob(){

       const jobObject:jobObjectLargeItems = {
           loadType: "largeItems",
           details: {
                manifest: manifest,
                twoMan: twoMan,
                quantity: quantity,
                estimatedLabor: labour
              
           }
       }


       const OrderInfo = {
              userID: data.user.email,
              title: title,
              description: description,
              pickupTime: pickupTime,
              pickupLocation: pickupLocation,
              dropOffLocation: dropOffLocation,
              jobObject: jobObject,
              distance: 0,
              duration: 0
       }

       const res = await fetch("/api/geocode",{
              method: "POST",
              body: JSON.stringify({
                pickup_location: pickupLocation,
                dropoff_location: dropOffLocation
              })
         })
        const resJson = await res.json() 
        OrderInfo.distance = resJson.distance
        OrderInfo.duration = resJson.duration
        console.log(OrderInfo)
        setOrderInfo(OrderInfo)

}

async function createJob(){

    const res = await fetch("/api/jobs/queryJobs",{
        method: "POST",
        body : JSON.stringify(orderInfo)})


}

    const handlePickupCountry = (country:keyof typeof ACCEPTED_COUNTRIES) => {
        setPickupLocation({...pickupLocation, country:country})

    }

    const handlePickupProvince = (province:keyof typeof ACCEPTED_PROVINCES) => {
        setPickupLocation({...pickupLocation, province:province})
   
    }

    const listArray = ["largeItems" , "garbage","looseMaterial" ]



    return(
        <div className="w-screen flex-col h-screen bg-gray-200">
            
            {progress===0?
            <div key={0} className="flex-col flex items-center h-2/3 justify-top py-10 ">
                Title <Input type="text" placeholder={title?title:null} setValue={setTitle}/>
                Description <textarea className="border-2 border-gray-300 rounded-lg p-2" placeholder={description?description:null} onChange={(e)=>setDescription(e.target.value)}/>
                Type of Load <Dropdown listArray={listArray} textColor="black" bg="white" itemColor="gray-200" item={loadType} setItem={setLoadType}/>
                Date of service required <input type="date" onChange={(e)=>setPickupTime(new Date(e.target.value))}/>
            </div>:
            progress===1&&loadType==="largeItems"?
            <div key={1} className="flex-col flex items-center h-2/3 justify-top py-10 ">
                Labour estimate in hours: <Increment value={labour} increment={0.1} setValue={setLabour}/>
                Are two people required? <Dropdown listArray={["Yes","No"]} textColor="black" bg="white" itemColor="gray-200" item={twoMan?"Yes":"No"} setItem={(value)=>setTwoMan(value==="Yes"?true:false)}/>
                Please provide a manifest of the items you need moved:
                <Manifest manifest={manifest} setManifest={setManifest}/>
            
            
            </div>:
            progress===2&&loadType==="largeItems"?
            <div key={2} className="flex-col flex items-center h-2/3 justify-evenly py-10 ">
                <h1>Pick up and Dropoff Location</h1>
                <h2>Pickup Location</h2>
                    <div>Country: <Dropdown listArray= {Object.keys(ACCEPTED_COUNTRIES)} textColor="black" bg="white" itemColor="gray-200" item={pickupLocation?.country} setItem={handlePickupCountry}/></div>
                    <div>Province: <Dropdown listArray= {Object.keys(ACCEPTED_PROVINCES)} textColor="black" bg="white" itemColor="gray-200" item={pickupLocation?.province} setItem={handlePickupProvince}/></div>
                    <div>City: <Input type="text" placeholder={pickupLocation?.city?pickupLocation.city:null} setValue={(value)=>setPickupLocation({...pickupLocation, city:value})}/></div>
                    <div>Address: <Input type="text" placeholder={pickupLocation?.address?pickupLocation.address:null} setValue={(value)=>setPickupLocation({...pickupLocation, address:value})}/></div>
                    <div>Postal Code: <Input type="text" placeholder={pickupLocation?.postalCode?pickupLocation.postalCode:null} setValue={(value)=>setPickupLocation({...pickupLocation, postalCode:value})}/></div>
                <h2>Dropoff Location</h2>
                    <div>Country: <Dropdown listArray= {Object.keys(ACCEPTED_COUNTRIES)} textColor="black" bg="white" itemColor="gray-200" item={dropOffLocation?.country} setItem={(value)=>setDropOffLocation({...dropOffLocation, country:value})}/></div>
                    <div>Province: <Dropdown listArray= {Object.keys(ACCEPTED_PROVINCES)} textColor="black" bg="white" itemColor="gray-200" item={dropOffLocation?.province} setItem={(value)=>setDropOffLocation({...dropOffLocation, province:value})}/></div>
                    <div>City: <Input type="text" placeholder={dropOffLocation?.city?dropOffLocation.city:null} setValue={(value)=>setDropOffLocation({...dropOffLocation, city:value})}/></div>
                    <div>Address: <Input type="text" placeholder={dropOffLocation?.address?dropOffLocation.address:null} setValue={(value)=>setDropOffLocation({...dropOffLocation, address:value})}/></div>
                    <div>Postal Code: <Input type="text" placeholder={dropOffLocation?.postalCode?dropOffLocation.postalCode:null} setValue={(value)=>setDropOffLocation({...dropOffLocation, postalCode:value})}/></div>
            </div>:
            progress===3?
            <div key={3} className="flex-col flex items-center h-2/3 justify-top py-10 ">
                <h1 className="text-3xl">Please Confirm Details</h1>
                <h2>Title: {title}</h2>
                <h2>Description: {description}</h2>
                <h2>Load Type: {loadType}</h2>
                <h2>Pickup Time: {pickupTime.toString()}</h2>
                <h2>Labour Estimate: {labour} hours</h2>
                <h2>Manifest: {manifest.map((item)=>{return(<div>{item.name} : {item.quantity}</div>)})}</h2>
                <h2>Pickup Location: {pickupLocation.city}, {pickupLocation.province}, {pickupLocation.country}, {pickupLocation.postalCode}</h2>
                <h2>Dropoff Location: {dropOffLocation.city}, {dropOffLocation.province}, {dropOffLocation.country}, {dropOffLocation.postalCode}</h2>
                <Button text="Confirm" color="green" type="regular" callback={()=>generateJob()}/>
            </div>:
            progress===4?
            <div key={4} className="flex-col flex items-center h-2/3 justify-top py-10 ">
                <div>
                    <Button text="Create Job" color="green" type="regular" callback={()=>createJob()}/>
                </div>
            </div>:null
            }
            <div className="px-5 w-screen flex flex-row-reverse justify-between">
            <Button text="Next" color="white" type="regular" callback={()=>setProgress(progress+1)}/>
            {progress > 0 ? <Button text="Back" color="white" type="regular" callback={()=>setProgress(progress-1)}/> : null}
            </div>
        </div>
    )
}