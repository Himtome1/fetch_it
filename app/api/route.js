const USERS = 
    { user: "Himtome1", password: "4132" }

async function POST(req, res){
    const credentials = await req.json()
    console.log(credentials)
    console.log(USERS)
    if (credentials.user == USERS.user && credentials.password == USERS.password){
        return Response.json({"Status":"Good"}
        )
    }
    else{ return Response.json({},{status:400, statusText:"Invalid username or password"})}
    
    
}

export{POST}