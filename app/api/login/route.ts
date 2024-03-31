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
        
        try{

            const data:any = await req.json();

            if(data.email && data.password){

                const email:string = data.email;
                const password:string = data.password;
                const validated:boolean = await validateUser(email, password);
                if(validated) {
                    return(NextResponse.json({message : `Login Success! Welcome, ${email}`}, {status: 200}));
                }
                return(NextResponse.json({message : "Invalid Credentials"}, {status: 401}));
            }

            return (NextResponse.json({message : "Incomplete Credentials"},{status:424}));

        }
        catch(e){

            return(NextResponse.json({message: "Unexpected Server Error", error: e}, {status: 500}));

        }
    }

export {POST};