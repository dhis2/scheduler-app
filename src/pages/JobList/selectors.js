export const getEntities = jobs => {
    return jobs.reduce((entities, job) => {
        const id = job.id
        entities[id] = job

        return entities
    }, {})
}

export const getIds = jobs => {
    return jobs.map(job => job.id)
}

export const getUserJobIds = jobs => {
    return jobs.filter(job => job.configurable).map(job => job.id)
}
