import { Router } from 'express'
import { healthRouter } from './health.routes.js'
import { memberRouter } from './member.routes.js'
import { projectRouter } from './project.routes.js'
import { dealRouter } from './deal.routes.js'
import { invoiceRouter } from './invoice.routes.js'

/** Every API route, mounted under /api. */
export const apiRouter = Router()

apiRouter.use('/health', healthRouter)
apiRouter.use('/members', memberRouter)
apiRouter.use('/projects', projectRouter)
apiRouter.use('/deals', dealRouter)
apiRouter.use('/invoices', invoiceRouter)
