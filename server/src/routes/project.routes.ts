import { Router } from 'express'
import { projectController } from '../controllers/project.controller.js'

export const projectRouter = Router()

projectRouter.get('/', projectController.list)
projectRouter.get('/:id', projectController.getById)
projectRouter.post('/', projectController.create)
projectRouter.patch('/:id', projectController.update)
projectRouter.delete('/:id', projectController.remove)
