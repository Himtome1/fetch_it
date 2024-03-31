"use client"
import Link from "next/link"
export default function Apply(){
    return(
        <div className = "bg-blue-900 w-screen h-screen items-center justify-center flex flex-col">
            <div className="flex mb-40">
                <Link href="/"><p className="text-white font-bold text-7xl">Fetch.it</p></Link>
            </div>
            <div className="flex ">
                <p className="text-white text-4xl">Applications are currently closed</p>
            </div>
            <div className="flex ">
                <p className="text-white text-4xl">Thank you for your interest!</p>
            </div>
        </div>
    )
}