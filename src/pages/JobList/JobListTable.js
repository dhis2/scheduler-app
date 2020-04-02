import React from 'react'
import { object, arrayOf, string } from '@dhis2/prop-types'
import {
    Table,
    TableHead,
    TableRowHead,
    TableRow,
    TableCell,
    TableCellHead,
    TableBody,
} from '@dhis2/ui-core'
import i18n from '@dhis2/d2-i18n'
import JobListTableItem from './JobListTableItem'

const JobListTable = ({ jobIds, jobEntities }) => (
    <Table>
        <TableHead>
            <TableRowHead>
                <TableCellHead>{i18n.t('Job name')}</TableCellHead>
                <TableCellHead>{i18n.t('Type')}</TableCellHead>
                <TableCellHead>{i18n.t('Schedule')}</TableCellHead>
                <TableCellHead>{i18n.t('Next run')}</TableCellHead>
                <TableCellHead>{i18n.t('Status')}</TableCellHead>
                <TableCellHead>{i18n.t('On/off')}</TableCellHead>
                <TableCellHead />
            </TableRowHead>
        </TableHead>
        <TableBody>
            {jobIds.length === 0 ? (
                <TableRow>
                    <TableCell>{i18n.t('No jobs to display')}</TableCell>
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
    jobEntities: object.isRequired,
    jobIds: arrayOf(string).isRequired,
}

export default JobListTable
