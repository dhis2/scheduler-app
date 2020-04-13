import React, { useState } from 'react'
import JobAdd from './JobAdd'

const JobAddContainer = () => {
    const [isPristine, setIsPristine] = useState(true)

    return <JobAdd isPristine={isPristine} setIsPristine={setIsPristine} />
}

export default JobAddContainer
