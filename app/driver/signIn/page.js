"use client"
import React from "react"
import {useState, useEffect} from "react"
import { signIn } from "next-auth/react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Button from "../../components/Button"
import Input from "../../components/Input"


function SignIn(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const {status} = useSession()
    
    useEffect(
        ()=>{
            if (status === "authenticated")
            router.push('./dashboard')
        },[router, status]
    )
    async function handleSignIn () {
        signIn('credentials',{ redirect: false, email,password})
    }
    return(
        <div className="w-screen h-screen bg-blue-900 items-center justify-center flex flex-col">
            <Link href="/"><h1 className="text-5xl text-white font-bold">Fetch.it</h1></Link>
            <h1 className="text-5xl text-yellow-400 font-bold mt-10 italic">DRIVER</h1>
            <div className="w-80 h-80 p-5 flex flex-col bg-gray-400 mt-20 bg-white items-center justify-evenly rounded-lg">
                <div className="flex flex-col w-min h-44 justify-evenly">

                    <Input type="email" placeholder="Email" setValue={setEmail}/>
                    <Input type="password" placeholder="Password" setValue={setPassword}/>
                    
                </div>
                <Button type="regular" color="yellow" text="Sign in" callback={handleSignIn}/>
                <div className="flex-col flex items-center justify-center mt-5 mb-3">
                <p>Dont have an account?</p>
                <Button type = "small" color="blue" text="Sign up"  callback={()=>router.push("./signUp")}/>
                </div>
            </div>
        </div>
    )
}
export default SignIn
