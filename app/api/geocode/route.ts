import { NextResponse } from "next/server";
async function POST(req:Request){

    const reqJson = await req.json();
    const origin:string =`${reqJson.pickup_location.address}, ${reqJson.pickup_location.city}, ${reqJson.pickup_location.province}, ${reqJson.pickup_location.country}`
    const destination = `${reqJson.dropoff_location.address}, ${reqJson.dropoff_location.city}, ${reqJson.dropoff_location.province}, ${reqJson.dropoff_location.country}`
    const apiKey = process.env.DISTANCE_MATRIX_API_KEY
    const url = `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${apiKey}`
    const urlString = encodeURI(url)
    const distanceMatrix = await fetch(urlString, {method: "GET"})
    const distanceMatrixJson = await distanceMatrix.json()
    return NextResponse.json({
        distance: distanceMatrixJson.rows[0].elements[0].distance.value,
        duration: distanceMatrixJson.rows[0].elements[0].duration.value,
    })
}
export{POST}