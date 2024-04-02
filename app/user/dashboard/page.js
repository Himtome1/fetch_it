"use client"
import { signIn, useSession, signOut } from "next-auth/react"
import Link from "next/link"
import Button from "../../components/Button"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

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
    return(
        <div className="w-screen grid-rows-5 grid-cols-4 h-screen bg-blue-900">
            
        </div>
    )
}