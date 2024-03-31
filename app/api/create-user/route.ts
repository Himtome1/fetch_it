import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"

const prisma = new PrismaClient;

async function createUser(email:string, password:string){
    const user = await prisma.user.create({
        data: {

            email: email,
            password: password

        }
    })
}
async function checkEmail(emailSupplied:string){
 
    try{
    const emailExist = await prisma.user.findFirst({
        where: {

            email : emailSupplied

        }
    })
    if (emailExist){

        return true}

    return false

    }
    catch(e){

        return false

    }
}

async function POST(req:Request) {
    if (req.method === "POST"){

        try{

            const data = await req.json();
            const email = data.email;
            const password = data.password;
            const conflict = await checkEmail(email)

            if (conflict == true){

                return(NextResponse.json({message:"User already exists"}, {status: 409}))

            }
            else{
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(password,salt)
            await createUser(email, hash);
            await prisma.$disconnect();
            return NextResponse.json({message:`Account with email: ${email} successfully created`});

            }
        }
        catch(e){
            console.error(e);
            await prisma.$disconnect();
            return NextResponse.json({

                message:"Unexpected Error",
                error: e


            }, {status: 500});
        }
    }
    else return NextResponse.json({message: "Method not allowed, this endpoint is for POST requests"}, {status:405});

}
export {POST};