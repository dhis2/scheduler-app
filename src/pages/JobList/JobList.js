import React from 'react'
import { Card } from '@dhis2/ui-core'
import { Link } from 'react-router-dom'
import { Title } from '../../components/Title'
import { Info } from '../../components/Icons'

const JobList = () => (
    <React.Fragment>
        <Title priority={2}>Scheduled Jobs</Title>
        <Info />
        <Card>
            <Link to="/add">New job</Link>
            <table>
                <thead>
                    <tr>
                        <th>Job name</th>
                        <th>Type</th>
                        <th>Frequency</th>
                        <th>Next run in</th>
                        <th>Status</th>
                        <th>On/off</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </Card>
    </React.Fragment>
)

export default JobList
