import express from 'express'
import printController from '../controllers/printController.js'
const routerPrint = express.Router()

routerPrint.route('/')
.get(printController.getAllPrint)
.post(printController.createNewPrint)
.delete(printController.deletePrint)

export default routerPrint