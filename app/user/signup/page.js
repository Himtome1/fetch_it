"use client"
import Input from "../../components/Input"
import Button from "../../components/Button"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function SignUp() {

    const [attemptedSubmit, setAttemptedSubmit] = useState(false)
    const [userExists, setUserExists] = useState(false)
    const [status, setStatus] = useState(false)
    const [user, setUser] = useState(null)
    const [email, setEmail] = useState(null)
    const [phone, setPhone] = useState(null)
    const [address, setAddress] = useState(
        {
            country: null,
            province: null,
            city: null,
            address: null,
            postalCode: null,
        }
    )
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [passwordsMatch, setPasswordsMatch] = useState(false)

    const router = useRouter()
    
    useEffect(
        ()=>{
            if(password && confirmPassword){
                if(password == confirmPassword){
                    setPasswordsMatch(true)
                }
                else setPasswordsMatch(false)
            }
        }, [password,confirmPassword]
    )

    const handleSubmit = async () => {
        if( user && email && phone && password && confirmPassword && passwordsMatch){
        
            const userObject = {
                name: user,
                email: email,
                phone: phone,
                address: address,
                password: password,
                driver: false
            }
        
            const res = await fetch("../api/create-user", {
                method: "POST",
                body: JSON.stringify(userObject)
            })

            .then(
                (res)=>{
                    
                    if (res.status == 200){
                        setStatus(true)
                    }
                    else if(res.status == 409){
                        setUserExists(true)
                    }
                }
                )
            .catch((error)=>console.error(error))
            
        }
        else setAttemptedSubmit(true)
    }

    return(
            !userExists?(!status?(<div className="bg-blue-900 w-screen h-screen flex-col flex items-center justify-evenly">
                <Link href = "../"className="text-5xl text-white font-bold">Fetch.it</Link>
                <div className="w-1/3 h-2/3 bg-gray-200 flex flex-col items-center justify-center rounded-xl px-10 pb-10 pt-2">
                    <div className="pb-2">
                        <p className="text-2xl font-bold">Create a new account</p>
                    </div>
                    <div className="flex flex-col items-center justify-evenly bg-white rounded-xl w-full h-full">
                        <Input placeholder="Enter your username" type="text" name="user" setValue={setUser}/>
                        <Input placeholder="Enter your email" type="email" name="email" setValue={setEmail}/>
                        <Input placeholder="Enter your phone number" type="tel" name="user" setValue={setPhone}/>
                        <Input placeholder="Create a password" type="password" name="password" setValue={setPassword}/>
                        <Input placeholder="Confirm your password" type="password" name="confirm" setValue={setConfirmPassword}/>
                        {(password && confirmPassword && !passwordsMatch)? <p className="text-red-500">Passwords must match</p>:null}
                        {(attemptedSubmit&& !(user&&password&&phone&&email&&confirmPassword))
                        ?<p className="text-red-500">All fields must be completed</p>:null}
                        <Button color="blue" text="Submit" callback={handleSubmit}/>
                        <Link className="text-green-600" href={"./signIn"}>Already have an account?</Link>
                    </div>
                    <div className="bg-blue-900">
                    </div>
                </div>
            </div>):
            <div className="bg-blue-900 w-screen h-screen flex-col flex items-center justify-center">
                <p className="text-5xl text-white font-bold">Signup Successful</p>
                <p className="text-xl text-white font-bold">Click below to sign in</p>
                <Button color="yellow" text="Sign in" callback={()=>router.push("./signIn")}/>
            </div>):
            <div className="bg-blue-900 w-screen h-screen flex-col flex items-center justify-center">
            <p className="text-5xl text-white font-bold">Email already exists!</p>
            <p className="text-xl text-white font-bold">Click below to sign in</p>
            <Button color="yellow" text="Sign in" callback={()=>router.push("./signIn")}/>
        </div>
    )

}