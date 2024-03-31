"use client"
import React from "react"
import {useState, useEffect} from "react"

export default function Home(){
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    function handleEmail(e) {
        setEmail(e.target.value)
    }
    function handlePassword(e) {
        setPassword(e.target.value)
    }

    return(
        <div className="w-screen h-screen bg-blue-900 items-center justify-center flex flex-col">
            <h1 className="text-5xl text-white font-bold">Fetch.it</h1>
            <div className="w-min h-min p-20 flex flex-col items-center bg-gray-400 mt-20 justify-center bg-white rounded-lg">
                <input className="mb-5" type="email" onChange={(event)=>handleEmail(event)}>
                </input>
                <input type="password" onChange={(event) => handlePassword(event)}></input>
                <button >
                    Login
                </button>
            </div>
        </div>
    )
}