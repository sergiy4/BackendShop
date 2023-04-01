import allowedOrigin from "./allowedOrigins.js";

const corsOption = {
    origin:(origin,callback) =>{
        if(allowedOrigin.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        }else{
            callback(new Error ('Not allowed by CORS'))
        }
    },
    credential:true,
    optionSuccessStatus: 200,
}

export default corsOption