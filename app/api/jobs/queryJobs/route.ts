import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const BASE_RATE = 40
const DIST_RATE = 1.5
const TIME_RATE = 30

const prisma = new PrismaClient

async function getJobs()
    {
         const query = await prisma.jobs.findMany(
            {
                select:{
                    job_id : true,
                    price : true,
                    date : true,
                    description : true,
                    distance: true,
                    time: true,
                }
            }
    )
    return query
    }
async function distanceMatrix(to:string, from:string){
    const distMatrix = await fetch("http://localhost:3000/api/geocode",{
        method:"post",
        body:JSON.stringify({
            pickup_location : from,
            dropoff_location : to
        })
    })
    const distMatrixJson = await distMatrix.json()
    return [distMatrixJson.distance, distMatrixJson.duration]
}
async function postJob(job){

    try{
    await prisma.jobs.create({
        data : {
            price: job.price,
            user_id: job.user_id,
            description: job.description,
            load_weight: job.load_weight,
            date: job.date,
            dropoff_location: job.dropoff_location,
            pickup_location: job.pickup_location,
            distance: parseFloat(job.distance),
            time: parseFloat(job.time),
        }
    })}
    catch(e){
        console.error(e)
    }
    
}

function calcCost(dist,time){
    const cost = BASE_RATE + dist * DIST_RATE + time * TIME_RATE
    return  parseFloat(cost.toFixed(2))
}

async function POST(req:Request){

    const reqJson = await req.json()
    const [dist, time] = await distanceMatrix(reqJson.dropoff_location, reqJson.pickup_location)
    reqJson.distance = (dist/1000).toFixed(2)
    reqJson.time = (time/3600).toFixed(2)
    reqJson.price = calcCost((dist/1000), (time/3600))

    console.log(reqJson)

    await postJob(reqJson)

    return(NextResponse.json({distance:dist/1000, time:time/3600}, {status:200}))
}

async function GET(req:Request){
    const res = await getJobs()
    return NextResponse.json(res, {status:200})
}

export{GET, POST}
