import express from 'express'
import userController from '../controllers/userController.js'
const routerUser = express.Router()

routerUser.route('/')
.get(userController.getAllUser)
.post(userController.createNewUser)
.patch(userController.updateUser)
.delete(userController.deleteUser)




export default routerUser
