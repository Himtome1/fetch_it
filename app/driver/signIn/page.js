"use client"
import React from "react"
import {useState, useEffect} from "react"
import { signIn } from "next-auth/react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"


function SignIn(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const {status} = useSession()
    
    useEffect(
        ()=>{
            if (status === "authenticated")
            router.push('/driver/dashboard')
        },[router, status]
    )
    function handleEmail(e) {
        setEmail(e.target.value)
    }
    function handlePassword(e) {
        setPassword(e.target.value)
    }

    return(
        <div className="w-screen h-screen bg-blue-900 items-center justify-center flex flex-col">
            <h1 className="text-5xl text-white font-bold">Fetch.it</h1>
            <h1 className="text-5xl text-yellow-400 font-bold mt-10 italic">DRIVER</h1>
            <div className="w-min h-min p-20 flex flex-col items-center bg-gray-400 mt-20 justify-center bg-white rounded-lg">
                <input className="mb-5" type="email" onChange={(event)=>handleEmail(event)}>
                </input>
                <input type="password" onChange={(event) => handlePassword(event)}></input>
                <button onClick = {async()=> await signIn('credentials',{ redirect: false, email,password}) .then((res)=>{console.log(res)})}>
                    Login
                </button>
            </div>
        </div>
    )
}
export default SignIn
