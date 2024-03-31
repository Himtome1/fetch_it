import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"

const prisma = new PrismaClient();

async function validateUser (email:string, password:string) {
   
    try{
        const user:any = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        const hashedPassword:string = user.password
        const valid:boolean = await bcrypt.compare(password,hashedPassword);

        if(valid){
            console.log("User Validated")
        return true;
        }
        return (false);
    }
    catch(e){
        console.error(e)
        return(false)
    }
}

async function POST (req:Request){
    console.log("receiving POST")
        try{
            
            const data:any = await req.json();
            

            if(data.email && data.password){
                console.log(data.email, data.password)
                const email:string = data.email;
                const password:string = data.password;
                const validated:boolean = await validateUser(email, password);
                if(validated) {
                    return(NextResponse.json({ok: true, user: data}, {status: 200}));
                }
                return(NextResponse.json({ok: false}, {status: 401}));
            }

            return (NextResponse.json({message : "Incomplete Credentials"},{status:424}));

        }
        catch(e){

            return(NextResponse.json({message: "Unexpected Server Error", error: e}, {status: 500}));

        }
    }

export {POST};