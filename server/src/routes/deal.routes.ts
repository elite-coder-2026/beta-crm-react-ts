import { Router } from 'express'
import { dealController } from '../controllers/deal.controller.js'

export const dealRouter = Router()

dealRouter.get('/', dealController.list)
dealRouter.get('/:id', dealController.getById)
dealRouter.post('/', dealController.create)
dealRouter.patch('/:id', dealController.update)
dealRouter.delete('/:id', dealController.remove)
