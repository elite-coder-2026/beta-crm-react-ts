import { Router } from 'express'
import { invoiceController } from '../controllers/invoice.controller.js'

export const invoiceRouter = Router()

invoiceRouter.get('/', invoiceController.list)
invoiceRouter.get('/:id', invoiceController.getById)
invoiceRouter.post('/', invoiceController.create)
invoiceRouter.patch('/:id', invoiceController.update)
invoiceRouter.delete('/:id', invoiceController.remove)
