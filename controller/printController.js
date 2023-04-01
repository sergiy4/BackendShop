import User from '../models/User.js'
import Print from '../models/Print.js';
import expressAsyncHandler from 'express-async-handler'
import bcrypt from "bcrypt";

const getAllPrint = expressAsyncHandler(async (req, res) => {
    
   
    const  { printname } = req.query;


    if (!printname) {

        return res.status(400).json({ message: 'No prints found' })
            
    }

    const na = printname.toLowerCase()

    const prints = await Print.find({printname: {$regex :`${na}`}}).lean()
        
   

    res.json(prints)
    
    
})


const createNewPrint = expressAsyncHandler(async (req, res) => {
    const { printname, price ,imgurl} = req.body

    // Confirm data
    if (!printname || !price || !imgurl) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const print = await Print.create({ printname, price ,imgurl })

    if (print) { // Created 
        return res.status(201).json({ message: 'New Print created' })
    } else {
        return res.status(400).json({ message: 'Invalid note data received' })
    }

})


const deletePrint = expressAsyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Print ID required' })
    }

    // Confirm note exists to delete 
    const print = await Print.findById(id).exec()

    if (!print) {
        return res.status(400).json({ message: 'Print not found' })
    }

    const result = await print.deleteOne()

    const reply = `Print '${result.printname}' with ID ${result._id} deleted`

    res.json(reply)
})

export default  {
    getAllPrint,
    createNewPrint,
    deletePrint
}