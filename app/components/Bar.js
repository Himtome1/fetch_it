"use client"
import {signIn, signOut, useSession} from "next-auth/react"
import Button from "./Button"

export default function Bar() {
    const data = useSession().data
    return(
        data ? <div className="w-screen justify-end flex bg-blue-900 p-5">
            <Button callback={signOut} text="Sign out" type="small" color="yellow"/>
        </div> : null
    )
}