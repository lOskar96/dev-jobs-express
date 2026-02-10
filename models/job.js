import jobs from '../jobs.json' with { type: 'json' }

export class JobModel {
  static async getAll({ text, type, level, limit, technology, offset }) {
    let filteredJobs = jobs

    if (text) {
      const searchTerm = text.toLowerCase()
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.titulo.toLowerCase().includes(searchTerm) ||
          job.descripcion.toLowerCase().includes(searchTerm)
      )
    }

    if (type) {
      filteredJobs = filteredJobs.filter((job) =>
        job.data.modalidad.includes(type)
      )
    }

    if (technology) {
      filteredJobs = filteredJobs.filter((job) =>
        job.data.technology.includes(technology)
      )
    }

    if (level) {
      filteredJobs = filteredJobs.filter((job) =>
        job.data.nivel.includes(level)
      )
    }

    const limitNumber = Number(limit)
    const offsetNumber = Number(offset)

    const paginatedJobs = filteredJobs.slice(
      offsetNumber,
      limitNumber + offsetNumber
    )
    return {
      data: paginatedJobs,
      total: paginatedJobs.length,
      limit: limitNumber,
      offset: offsetNumber
    }
  }

  static async getId({ id }) {
    const job = jobs.find((job) => job.id === id)
    if (!job) {
      return res.status(404).json({ message: 'Empleo no encontrado' })
    }
    return job
  }

  static async create({ titulo, empresa, ubicacion, data }) {
    const newJob = {
      id: crypto.randomUUID(),
      titulo,
      empresa,
      ubicacion,
      data
    }

    jobs.push(newJob)
    return newJob
  }

  static async delete({ id }) {
    const jobIndex = jobs.findIndex((job) => job.id === id)
    if (jobIndex === -1) {
      return false
    }
    jobs.splice(jobIndex, 1)
    return true
  }

  static async update({ id, titulo, empresa, ubicacion, data }) {
    const jobIndex = jobs.findIndex((job) => job.id === id)
    if (jobIndex === -1) {
      return res.status(404).json({ message: 'Empleo no encontrado' })
    }
    jobs[jobIndex] = {
      id,
      titulo,
      empresa,
      ubicacion,
      data
    }
    return jobs[jobIndex]
  }

  static async partialUpdate({ id, titulo, empresa, ubicacion, data }) {
    const jobIndex = jobs.findIndex((job) => job.id === id)
    if (jobIndex === -1) {
      return res.status(404).json({ message: 'Empleo no encontrado' })
    }
    jobs[jobIndex] = {
      id,
      titulo,
      empresa,
      ubicacion,
      data
    }
    return jobs[jobIndex]
  }
}
