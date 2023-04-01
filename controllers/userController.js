import User from '../models/User.js'
import Note from '../models/Print.js'
import expressAsyncHandler from 'express-async-handler'
import bcrypt from "bcrypt";
// get
const getAllUser = expressAsyncHandler (async (req,res) =>{
    const users = await User.find().select('-password').lean()
    if(!users?.length) {
        return res.status(400).json({message: 'No users found'})
    
    }

    res.json(users)


})

// post
// Create new user
const createNewUser = expressAsyncHandler (async (req,res) =>{
    const {username,password} = req.body

    if(!username || !password ){
        return res.status(400).json({message:"All fields are required"})
    }

    // Check for duplicate
    const duplicate = await User.findOne({username}).lean().exec()

    if(duplicate){
        return res.status(409).json({message : 'Duplicate username'})
    }

    const hashedPwd = await bcrypt.hash(password,10)

    const userObject = {username, "password": hashedPwd}

    // Create and store new user

    const user = await  User.create(userObject);
    if(user){
        res.status(201).json({message: `New user ${username} created`})
    }else{
        res.status(400).json({message: 'Invalid user data received'})
    }
})



// patch 
// Update
const updateUser = expressAsyncHandler (async (req,res) =>{
    const {id,username, password } = req.body

    // Confirm data
    if(!id || !username || !password){
        return res.status(400).json({message : 'All fields are required'})
    }

    const user = await User.findById(id).exec()

    if(!user){
        return res.status(400).json({message: "User not found"})
    }

    // Check for duplicate
    const duplicate = await User.findOne({username}).lean().exec()

    if(duplicate && duplicate?._id.toString() !== id){
        return res.status(409).json({message: 'Duplicate email'})
    }

    user.username = username
    user.roles = roles
    user.active = active

    if(password){
        user.password = await bcrypt.hash(password ,10)
    }

    const updatedUser = await user.save()

    res.json({message: `${updatedUser.username} updated`})
})

// delete
// delete
const deleteUser = expressAsyncHandler (async (req,res) =>{

    const {id} = req.body
    if(!id){
        return res.status(400).json({message:'User ID Required'})
    }

    const note = await Note.findOne({user:id}).lean().exec()

    if(note){
        return res.status(400).json({message:'user has assigned notes'})
    }

    const user = await User.findById(id).exec()

    if(!user){
        return res.status(400).json({message:'User not found'})
    }

    const result = await user.deleteOne()

    const reply = `Username ${result.username} with ID ${result._id} deleted`

    res.json(reply)
})
export default {getAllUser,
                createNewUser,
                updateUser,
                deleteUser}