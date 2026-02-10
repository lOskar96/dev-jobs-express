import { Router } from 'express'
import { JobsController } from '../controllers/jobs.js'

const jobsRouter = Router()

jobsRouter.get('/', JobsController.getAll)
jobsRouter.get('/:id', JobsController.getId)
jobsRouter.delete('/:id', JobsController.delete)
jobsRouter.post('/', JobsController.create)
jobsRouter.put('/:id', JobsController.update)
jobsRouter.patch('/:id', JobsController.partialUpdate)

export default jobsRouter
