"use client"
import {signIn, signOut, useSession} from "next-auth/react"

export default function NavMenu() {
    const { data: session, status } = useSession();
    
    if(session != null){
        console.log(session.user.email)
    return(
        <div>
            <p>Hello {session.user.email}!</p>
            <button onClick = {()=>signOut()}>Sign Out</button>
        </div>
    )}
    return(
        <div>
            <button onClick = {()=>signIn()}>
                Sign In
            </button>
        </div>
    )
}