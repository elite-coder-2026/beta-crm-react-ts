import { Router } from 'express'
import { memberController } from '../controllers/member.controller.js'

export const memberRouter = Router()

memberRouter.get('/', memberController.list)
memberRouter.get('/:id', memberController.getById)
memberRouter.post('/', memberController.create)
memberRouter.patch('/:id', memberController.update)
memberRouter.delete('/:id', memberController.remove)
