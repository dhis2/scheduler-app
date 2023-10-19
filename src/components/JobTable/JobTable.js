import React from 'react'
import {
    Table,
    TableHead,
    TableRowHead,
    TableRow,
    TableCell,
    TableCellHead,
    TableBody,
} from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import JobTableRow from './JobTableRow'

const JobTable = ({ jobs, refetch }) => (
    <Table>
        <TableHead>
            <TableRowHead>
                <TableCellHead>{i18n.t('Name')}</TableCellHead>
                <TableCellHead>{i18n.t('Type')}</TableCellHead>
                <TableCellHead>{i18n.t('Schedule')}</TableCellHead>
                <TableCellHead>{i18n.t('Next run')}</TableCellHead>
                <TableCellHead>{i18n.t('Status')}</TableCellHead>
                <TableCellHead>{i18n.t('On/off')}</TableCellHead>
                <TableCellHead />
            </TableRowHead>
        </TableHead>
        <TableBody>
            {jobs.length === 0 ? (
                <TableRow>
                    <TableCell>{i18n.t('No jobs to display')}</TableCell>
                </TableRow>
            ) : (
                jobs.map((job) => {
                    const isValid = !!job?.sequence?.length

                    if (!isValid) {
                        return null
                    }

                    // A queue will have more than one item in .sequence
                    const isJob = job.sequence.length === 1

                    return (
                        <JobTableRow
                            key={job.id}
                            job={job}
                            refetch={refetch}
                            isJob={isJob}
                        />
                    )
                })
            )}
        </TableBody>
    </Table>
)

const { arrayOf, object, func } = PropTypes

JobTable.propTypes = {
    jobs: arrayOf(object).isRequired,
    refetch: func.isRequired,
}

export default JobTable
