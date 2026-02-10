import { DEFAULTS } from '../config.js'
import { JobModel } from '../models/job.js'

export class JobsController {
  static async getAll(req, res) {
    const {
      text,
      type,
      level,
      limit = DEFAULTS.LIMIT_PAGINATION,
      technology,
      offset = DEFAULTS.OFFSET_PAGINATION
    } = req.query

    const jobData = await JobModel.getAll({
      text,
      type,
      level,
      limit,
      technology,
      offset
    })

    return res.json(jobData)
  }

  static async getId(req, res) {
    const { id } = req.params
    const job = await JobModel.getId({ id })
    if (!job) {
      return res.status(404).json({ message: 'Empleo no encontrado' })
    }
    return res.json(job)
  }

  static async create(req, res) {
    const { titulo, empresa, ubicacion, data } = req.body

    const newJob = await JobModel.create({ titulo, empresa, ubicacion, data })

    return res.status(201).json(newJob)
  }

  static async delete(req, res) {
    const { id } = req.params
    const job = await JobModel.delete({ id })
    if (!job) {
      return res.status(404).json({ message: 'Empleo no encontrado' })
    }
    return res.status(204).send()
  }

  static async update(req, res) {
    const { id } = req.params
    const { titulo, empresa, ubicacion, data } = req.body

    const job = await JobModel.update({ id, titulo, empresa, ubicacion, data })

    if (!job) {
      return res.status(404).json({ message: 'Empleo no encontrado' })
    }

    return res.json(job)
  }

  static async partialUpdate(req, res) {
    const { id } = req.params
    const { titulo, empresa, ubicacion, data } = req.body

    const job = await JobModel.partialUpdate({
      id,
      titulo,
      empresa,
      ubicacion,
      data
    })
    if (!job) {
      return res.status(404).json({ message: 'Empleo no encontrado' })
    }
    return res.json(job)
  }
}
