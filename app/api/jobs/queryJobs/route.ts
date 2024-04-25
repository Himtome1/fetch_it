import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const BASE_RATE = 40
const DIST_RATE = 1.5
const TIME_RATE = 30
const LABOR_RATE = 40

const prisma = new PrismaClient

async function getJobs()
    {
         const query = await prisma.jobs.findMany(
            {
                select:{
                    title : true,
                    job_id : true,
                    price : true,
                    date : true,
                    description : true,
                    distance: true,
                    time: true,
                    user_email: true,
                    driver_id: true,
                    pickup_location: true,
                    dropoff_location: true,
                    load_type: true,
                }
            }
    )
    return query
    }

async function postJob(job){

    try{
    await prisma.jobs.create({
        data : {
            price: job.price,
            user_email: job.userID,
            description: job.description,
            title: job.title,
            job_object: JSON.stringify(job.jobObject),
            date: job.pickupTime, //convert date to string
            dropoff_location: JSON.stringify(job.dropOffLocation),
            pickup_location: JSON.stringify(job.pickupLocation),
            distance: job.distance,
            time: job.duration,
            driver_id: null,
            load_type: job.jobObject.loadType,
            status: "pending"
        }
    })}
    catch(e){
        console.error(e)
    }
    
}

function calcCost(dist,time, jobObject){
    const labor:number = jobObject.details.estimatedLabor
    const twoMan :boolean = jobObject.details.twoMan
    const cost = BASE_RATE + dist * DIST_RATE + (time * TIME_RATE + LABOR_RATE * labor) * (twoMan ? 2 : 1)
    return  parseFloat(cost.toFixed(2))
}

async function POST(req:Request){

    const reqJson = await req.json()

    reqJson.distance = Number((reqJson.distance/1000).toFixed(2))
    reqJson.duration= Number((reqJson.duration/3600).toFixed(2))
    reqJson.price = calcCost(reqJson.distance, reqJson.duration, reqJson.jobObject)
    console.log(reqJson)
    await postJob(reqJson)
    console.log (reqJson)

    return(NextResponse.json({}, {status:200}))
}

async function GET(req:Request){
    const res = await getJobs()
    return NextResponse.json(res, {status:200})
}

export{GET, POST}
