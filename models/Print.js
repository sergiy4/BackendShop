import mongoose from "mongoose";
import Inc from 'mongoose-sequence'
const AutoIncrement = Inc(mongoose)


const printSchema = new mongoose.Schema(
    {
        printname:{
            type: String,
            required:true
        },
        price:{
            type: Number,
            required:true
        },
        imgurl:{
            type:String,
            required: true
        }
    }
)



export default mongoose.model('Print', printSchema)