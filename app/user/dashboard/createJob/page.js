"use client"
import { signIn, useSession, signOut } from "next-auth/react"
import Link from "next/link"
import Button from "../../../components/Button"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Input from "../../../components/Input"
import Dropdown from "../../../components/Dropdown"

export default function App() {
    const data = useSession().data
    const router = useRouter()
    useEffect(
        ()=>{
            if(!data){
                router.push("/")
            }
        },
        [data]
    )
    const listArray = ["Large Items (Non Garbage)" , "Garbage/Recycling","Loose Material" ]
    return(
        <div className="w-screen flex-col h-screen bg-blue-900">
            <div className="flex-col flex items-center justify-center ">
                Title <Input type="text"/>
                Description <Input type="text"/>
                Type of Load <Dropdown listArray={listArray} bg="white" itemColor="gray-200" setItem={()=>null}/>
                Pickup Location <Input type="text"/>
                Drop off Location<Input type="text"/>
                Time of pickup <input type="datetime-local"/>
            </div>
        </div>
    )
}