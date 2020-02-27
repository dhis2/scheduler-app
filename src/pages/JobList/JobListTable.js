import React from 'react'
import { object, arrayOf, string } from 'prop-types'
import {
    Table,
    TableHead,
    TableRowHead,
    TableRow,
    TableCell,
    TableCellHead,
    TableBody,
} from '@dhis2/ui-core'
import JobListTableItem from './JobListTableItem'

const JobListTable = ({ jobIds, jobEntities }) => (
    <Table>
        <TableHead>
            <TableRowHead>
                <TableCellHead>Job name</TableCellHead>
                <TableCellHead>Type</TableCellHead>
                <TableCellHead>Schedule</TableCellHead>
                <TableCellHead>Next run</TableCellHead>
                <TableCellHead>Status</TableCellHead>
                <TableCellHead>On/off</TableCellHead>
                <TableCellHead />
            </TableRowHead>
        </TableHead>
        <TableBody>
            {jobIds.length === 0 ? (
                <TableRow>
                    <TableCell>No jobs to display</TableCell>
                </TableRow>
            ) : (
                jobIds.map(id => (
                    <JobListTableItem key={id} job={jobEntities[id]} />
                ))
            )}
        </TableBody>
    </Table>
)

JobListTable.propTypes = {
    jobIds: arrayOf(string).isRequired,
    jobEntities: object.isRequired,
}

export default JobListTable
